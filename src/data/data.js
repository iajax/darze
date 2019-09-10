class Data {
  constructor(model) {
    this.model = model;
    this.source = [];
  }

  async find() {
    this.source = await this.model.find({});

    return this.source || [];
  }

  async findById(_id) {
    this.source = await this.model.findById(_id);

    return this.source || {};
  }
}

export default Data;
