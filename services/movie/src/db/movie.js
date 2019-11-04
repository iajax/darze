import { model, Schema } from 'mongoose'
import slugify from '../helpers/slugify'

const schema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectID,
      required: true
    },
    backdropPath: String,
    imdbId: {
      type: String,
      validate: {
        validator: imdbId => model('Movie').doesntExist({ imdbId }),
        message: ({ value }) => `imdbId ${value} has already been taken`
      }
    },
    originalTitle: {
      type: String,
      trim: true
    },
    overview: {
      type: String,
      trim: true
    },
    posterPath: String,
    releaseDate: String,
    runtime: Number,
    slug: String,
    status: String,
    tagline: String,
    title: {
      type: String,
      required: true
    },
    tmdbId: {
      type: Number,
      validate: {
        validator: tmdbId => model('Movie').doesntExist({ tmdbId }),
        message: ({ value }) => `tmdbId ${value} has already been taken`
      }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

schema.pre('save', async function(next) {
  this.slug = await slugify(this.title)

  return next()
})

schema.pre('findOneAndUpdate', async function(next) {
  this._update.$set.slug = await slugify(this._update.$set.title)

  return next()
})

schema.static({
  doesntExist: async function(filter) {
    return (await this.find(filter).countDocuments()) === 0
  }
})

export default model('Movie', schema)
