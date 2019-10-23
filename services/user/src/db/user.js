import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const schema = new Schema(
  {
    firstName: {
      type: String,
      trim: true
    },
    username: {
      type: String,
      validate: {
        validator: username => model('User').doesntExist({ username }),
        message: ({ value }) => `Username ${value} has already been taken`
      }
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: email => model('User').doesntExist({ email }),
        message: ({ value }) => `Email ${value} has already been taken`
      }
    },
    password: {
      type: String,
      required: true
    },
    picture: String,
    biography: String,
    externalUrl: String,
    private: {
      type: Boolean,
      default: false
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

schema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    return next()
  } catch (err) {
    return next(err)
  }
})

schema.method({
  comparePassword: async function(password) {
    return await bcrypt.compare(password, this.password)
  }
})

schema.static({
  doesntExist: async function(conditions) {
    return (await this.find(conditions).countDocuments()) === 0
  }
})

export default model('User', schema)
