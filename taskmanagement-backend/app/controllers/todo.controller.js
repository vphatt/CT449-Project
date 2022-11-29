const TodoService = require("../services/todo.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.title) {
    return next(new ApiError(400, "Tên công việc không được trống!"));
  }

  try {
    const todoService = new TodoService(MongoDB.client);
    const document = await todoService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Có lỗi xảy ra khi tạo Công việc"));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const todoService = new TodoService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await todoService.findByTitle(title);
    } else {
      documents = await todoService.find({});
    }
  } catch (error) {
    return next(new ApiError(500, "Có lỗi xảy ra khi truy xuất Công việc"));
  }

  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const todoService = new TodoService(MongoDB.client);
    const document = await todoService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy Công việc"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi truy xuất Công việc có id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Thông tin cập nhật không được để trống!"));
  }

  try {
    const todoService = new TodoService(MongoDB.client);
    const document = await todoService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy Công việc"));
    }
    return res.send({ message: "Công việc đã được cập nhật thành công!" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi cập nhật Công việc có id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const todoService = new TodoService(MongoDB.client);
    const document = await todoService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy Công việc"));
    }
    return res.send({ message: "Công việc đã được xoá thành công!" });
  } catch (error) {
    return next(new ApiError(500, `Lỗi xoá Công việc có id=${req.params.id}`));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const todoService = new TodoService(MongoDB.client);
    const deletedCount = await todoService.deleteAll();
    return res.send({
      message: deletedCount + " Các Công việc đã được xoá thành công!",
    });
  } catch (error) {
    return next(new ApiError(500, "Có lỗi xảy ra khi xoá tất cả Công việc"));
  }
};

exports.findAllComplete = async (_req, res, next) => {
  try {
    const todoService = new TodoService(MongoDB.client);
    const documents = await todoService.findComplete();
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Có lỗi xảy ra khi truy xuất các Công việc đã hoàn thành!`
      )
    );
  }
};
