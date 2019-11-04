import { DataSource } from 'apollo-datasource'
import DataLoader from 'dataloader'
import { keyBy, map } from 'lodash'

export default class MovieDataSource extends DataSource {
  initialize(config) {
    this.movie = config.context.models.Movie
    this.loader = new DataLoader(async ids => {
      const movies = await this.movie.find({ _id: { $in: ids } })
      const keys = keyBy(movies, '_id')

      return map(ids, id => keys[id])
    })
  }

  find() {
    return this.movie.find()
  }

  findById(id) {
    return this.loader.load(id)
  }

  create(input) {
    return this.movie.create(input)
  }

  update(id, input) {
    return this.movie
      .findOneAndUpdate({ _id: id }, { $set: input }, { new: true })
      .lean()
  }

  remove(id) {
    return this.movie.findOneAndRemove({ _id: id }).lean()
  }
}
