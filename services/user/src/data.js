import { ApolloError } from 'apollo-server'
import { DataSource } from 'apollo-datasource'
import DataLoader from 'dataloader'
import { keyBy, map } from 'lodash'
import User from './models/user'
import { newApiKey } from './utils/auth'
import { refresh, sign, verify } from './utils/token'

export default class UserDataSource extends DataSource {
  initialize() {
    this.loader = new DataLoader(userIds =>
      User.find({ _id: { $in: userIds } })
        .exec()
        .then(users => {
          const keys = keyBy(users, '_id')

          return Promise.all(map(userIds, userId => keys[userId]))
        })
    )
  }

  find() {
    return User.find({}).exec()
  }

  findById(id) {
    return this.loader.load(id)
  }

  findByEmail(email) {
    return User.findOne({ email }).exec()
  }

  async signup(input) {
    const apiKey = newApiKey()
    const user = await User.create({ ...input, apiKey })
    const token = await sign(user.apiKey, user._id)

    return { token, user }
  }

  async login(email, password) {
    const user = await this.findByEmail(email)

    if (!user) {
      throw new ApolloError(`The username does not exist`)
    }

    const match = await user.comparePassword(password)

    if (!match) {
      throw new ApolloError(`Invalid login`)
    }

    const token = await sign(user.apiKey, user._id)

    return { token, me: user }
  }

  async update(id, input) {
    return await User.findOneAndUpdate({ _id: id }, input, {
      new: true
    })
      .lean()
      .exec()
  }

  async remove(id) {
    return await User.findOneAndRemove({ _id: id })
      .lean()
      .exec()
  }

  async newToken(token) {
    if (token) {
      const payload = await verify(token)
      const accessToken = await sign(payload.aud, payload.sub)
      const refreshToken = await refresh(payload.aud, payload.sub)

      return {
        accessToken,
        refreshToken
      }
    }
  }
}
