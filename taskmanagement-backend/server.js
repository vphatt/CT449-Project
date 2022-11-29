const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer() {
  try {
    await MongoDB.connect(config.db.uri);
    console.log("Đã kết nối đến Cơ sở dữ liệu!");

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
    });
  } catch (error) {
    console.log("Không thể kết nối đến Cơ sở dữ liệu!", error);
    process.exit();
  }
}

startServer();
