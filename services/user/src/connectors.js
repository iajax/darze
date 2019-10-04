import dotenv from 'dotenv';
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

dotenv.config();

const uri = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`;
const options = {
  authSource: 'admin',
  useNewUrlParser: true,
};

const mongooseConnect = () => {
  mongoose.Promise = global.Promise;

  mongoose.connect(uri, options);

  mongoose.connection.on('connected', () => console.log("we're connected!"));

  mongoose.connection.on('error', err =>
    console.log(`Mongoose connection error: ${err}`)
  );

  mongoose.connection.on('disconnected', () =>
    console.log('Mongoose connection disconnected!')
  );

  mongoose.plugin(uniqueValidator);

  return true;
};

export default mongooseConnect;