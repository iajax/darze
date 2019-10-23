import { DataSource } from 'apollo-datasource'
import DataLoader from 'dataloader'
import { keyBy, map } from 'lodash'

export default class UserDataSource extends DataSource {
  initialize(config) {
    this.loader = new DataLoader(userIds =>
      config.context.models.User.find({ _id: { $in: userIds } })
        .exec()
        .then(users => {
          const keys = keyBy(users, '_id')

          return Promise.all(map(userIds, userId => keys[userId]))
        })
    )
  }

  findById(id) {
    return this.loader.load(id)
  }
}
