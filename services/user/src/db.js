import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import dotenv from 'dotenv';

dotenv.config();

const connect = () => {
  mongoose.Promise = global.Promise;

  mongoose
    .connect(process.env.MONGO_URI, {
      authSource: 'admin',
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(
      () => console.log("We're connected!"),
      err => console.log(`Mongoose connection error: ${err}`)
    );

  mongoose.plugin(uniqueValidator);

  return true;
};

export default connect;
