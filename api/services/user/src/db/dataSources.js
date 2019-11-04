import { ApolloError } from 'apollo-server'
import { DataSource } from 'apollo-datasource'
import DataLoader from 'dataloader'
import { keyBy, map } from 'lodash'
import { sign } from '../utils/token'

export default class UserDataSource extends DataSource {
  initialize(config) {
    this.user = config.context.models.User
    this.loader = new DataLoader(async ids => {
      const users = await this.user.find({ _id: { $in: ids } })
      const keys = keyBy(users, '_id')

      return map(ids, id => keys[id])
    })
  }

  find() {
    return this.user.find()
  }

  findById(id) {
    return this.loader.load(id)
  }

  async create(input) {
    const me = await this.user.create(input)
    const token = await sign({ sub: me._id })

    return { token, me }
  }

  update(id, input) {
    return this.user
      .findOneAndUpdate({ _id: id }, { $set: input }, { new: true })
      .lean()
  }

  remove(id) {
    return this.user.findOneAndRemove({ _id: id }).lean()
  }

  async login(email, password) {
    const me = await this.user.findOne({ email })

    if (!me) {
      throw new ApolloError(`The username does not exist`)
    }

    const match = await me.comparePassword(password)

    if (!match) {
      throw new ApolloError(`Invalid login`)
    }

    const token = await sign({ sub: me._id })

    return { token, me }
  }
}
