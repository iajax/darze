import { ApolloError } from 'apollo-server';
import { DataSource } from 'apollo-datasource';
import DataLoader from 'dataloader';
import { keyBy, map } from 'lodash';

class UserDataSource extends DataSource {
  initialize(config) {
    this.ctx = config.context;
    this.loader = new DataLoader(userIds =>
      this.ctx.models.user
        .find({ _id: { $in: userIds } })
        .exec()
        .then(users => {
          const keys = keyBy(users, '_id');

          return Promise.all(map(userIds, userId => keys[userId]));
        })
    );
  }

  find() {
    return this.ctx.models.user.find({}).exec();
  }

  findById(id) {
    return this.loader.load(id);
  }

  findByEmail(email) {
    return this.ctx.models.user
      .findOne({ email })
      .lean()
      .exec();
  }

  findByUsername(username) {
    return this.ctx.models.user
      .findOne({ username })
      .lean()
      .exec();
  }

  async create(input) {
    const existingUser = await this.findByEmail(input.email);

    if (existingUser) {
      throw new ApolloError('User exists already!');
    }

    let username = input.email.split('@')[0];

    const existingUsername = await this.findByUsername(username);

    if (existingUsername) {
      username = '';
    }

    return this.ctx.models.user.create({ ...input, username });
  }

  async update(id, input) {
    return await this.ctx.models.user
      .findOneAndUpdate({ _id: id }, input, { new: true, select: '-password' })
      .lean()
      .exec();
  }

  async remove(id) {
    return await this.ctx.models.user
      .findOneAndRemove({ _id: id })
      .lean()
      .exec();
  }

  async login(email, password) {
    const user = await this.findByEmail(email);

    if (user) {
      await this.ctx.models.user.comparePassword(password);
    }
  }
}

export default UserDataSource;
