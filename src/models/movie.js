import { Schema, model } from 'mongoose';

const schema = new Schema({
  title: String,
  description: String,
});

export default model('Movie', schema);
