const express = require("express");
const cors = require("cors");

const todosRouter = require("./app/routes/todo.route");
const notesRouter = require("./app/routes/note.route");

const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Quản Lý Công Việc Và Ghi Chú" });
});

app.use("/api/todos", todosRouter);
app.use("/api/notes", notesRouter);

//handle 404 response
app.use((req, res, next) => {
  return next(new ApiError(404, "Không tìm thấy tài nguyên"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Lỗi máy chủ",
  });
});

module.exports = app;
