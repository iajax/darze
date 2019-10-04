import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const schema = new Schema(
  {
    first_name: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_picture: String,
    biography: String,
    external_url: String,
    private: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    minimize: false,
    timestamps: true,
    versionKey: false,
  }
);

schema.pre('save', function(next) {
  const user = this;
  const saltRounds = 10;

  if (!this.isModified('password')) return next();

  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return next();

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next();

      user.password = hash;
      next();
    });
  });
});

schema.methods.comparePassword = function(password) {
  const hash = this.password;

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function(err, same) {
      if (err) return reject(err);

      resolve(same);
    });
  });
};

export default model('User', schema);
