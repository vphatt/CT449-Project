const { ObjectId } = require("mongodb");

class TodoService {
  constructor(client) {
    this.Todo = client.db().collection("Todos");
  }
  //Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractTodoData(payload) {
    const todo = {
      title: payload.title,
      content: payload.content,
      complete: payload.complete,
      deadline: payload.deadline,
    };

    //Remove underfined fields
    Object.keys(todo).forEach(
      (key) => todo[key] === undefined && delete todo[key]
    );
    return todo;
  }

  async create(payload) {
    const todo = this.extractTodoData(payload);
    const result = await this.Todo.findOneAndUpdate(
      todo,
      { $set: { complete: todo.complete === true } },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }

  async find(filter) {
    const cursor = await this.Todo.find(filter);
    return await cursor.toArray();
  }

  async findByTitle(title) {
    return await this.find({
      title: { $regex: new RegExp(title), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Todo.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractTodoData(payload);
    const result = await this.Todo.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async delete(id) {
    const result = await this.Todo.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  async deleteAll() {
    const result = await this.Todo.deleteMany({});
    return result.deletedCount;
  }

  async findComplete() {
    return await this.find({ complete: true });
  }
}

module.exports = TodoService;
