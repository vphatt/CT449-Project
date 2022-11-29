const { ObjectId } = require("mongodb");

class NoteService {
  constructor(client) {
    this.Note = client.db().collection("Notes");
  }
  //Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractNoteData(payload) {
    const note = {
      title: payload.title,
      content: payload.content,
      cover: payload.cover,
      favorite: payload.favorite,
    };

    //Remove underfined fields
    Object.keys(note).forEach(
      (key) => note[key] === undefined && delete note[key]
    );
    return note;
  }

  async create(payload) {
    const note = this.extractNoteData(payload);
    const result = await this.Note.findOneAndUpdate(
      note,
      { $set: { favorite: note.favorite === true } },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }

  async find(filter) {
    const cursor = await this.Note.find(filter);
    return await cursor.toArray();
  }

  async findByTitle(title) {
    return await this.find({
      title: { $regex: new RegExp(title), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Note.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractNoteData(payload);
    const result = await this.Note.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async delete(id) {
    const result = await this.Note.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  async deleteAll() {
    const result = await this.Note.deleteMany({});
    return result.deletedCount;
  }

  async findFavorite() {
    return await this.find({ favorite: true });
  }
}

module.exports = NoteService;
