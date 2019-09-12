import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: String,
  username: String,
});

export default model('User', schema);
