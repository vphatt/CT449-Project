const NoteService = require("../services/note.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.title) {
    return next(new ApiError(400, "Tên nhật ký không được trống!"));
  }

  try {
    const noteService = new NoteService(MongoDB.client);
    const document = await noteService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Có lỗi xảy ra khi tạo nhật ký"));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const noteService = new NoteService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await noteService.findByTitle(title);
    } else {
      documents = await noteService.find({});
    }
  } catch (error) {
    return next(new ApiError(500, "Có lỗi xảy ra khi truy xuất nhật ký"));
  }

  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const noteService = new NoteService(MongoDB.client);
    const document = await noteService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhật ký"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi truy xuất nhật ký có id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Thông tin cập nhật không được để trống!"));
  }

  try {
    const noteService = new NoteService(MongoDB.client);
    const document = await noteService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhật ký"));
    }
    return res.send({ message: "Nhật ký đã được cập nhật thành công!" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi cập nhật nhật ký có id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const noteService = new NoteService(MongoDB.client);
    const document = await noteService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhật ký"));
    }
    return res.send({ message: "Nhật ký đã được xoá thành công!" });
  } catch (error) {
    return next(new ApiError(500, `Lỗi xoá nhật ký có id=${req.params.id}`));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const noteService = new NoteService(MongoDB.client);
    const deletedCount = await noteService.deleteAll();
    return res.send({
      message: deletedCount + "Các nhật ký đã được xoá thành công!",
    });
  } catch (error) {
    return next(new ApiError(500, "Có lỗi xảy ra khi xoá tất cả Nhật ký"));
  }
};

exports.findAllFavorite = async (_req, res, next) => {
  try {
    const noteService = new NoteService(MongoDB.client);
    const documents = await noteService.findFavorite();
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, `Có lỗi xảy ra khi truy xuất các Ghi chú yêu thích!`)
    );
  }
};
