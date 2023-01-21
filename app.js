const express = require("express");
const server = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
//multer MW
const myMulter = require("./MW/imagesMW");
//routes
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const loginRoute = require("./routes/loginRoute");
const resetPassword = require("./routes/resetPassword");
const product = require("./routes/productRoute");
const productInfo = require("./routes/productInfoRoutes");
const order = require("./routes/orderRoute");

// DB connect
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database Connected");
    server.listen(process.env.port || 8081, () => {
      console.log("Server 8081 is listening");
    });
  })
  .catch((error) => {
    console.log("DataBase connection error" + error);
  });
//morgan middleWare
server.use(
  morgan("dev", {
    skip: (req, res) => {
      res.statusCode < 400;
    },
  })
);

// cors
server.use(cors({}));
// app.use(
//   cors({
//     origin: "http://localhost:4200",
//     credentials: true,
//   })
// );
server.use(cookieParser());

//endpoints Routes
server.use([
  express.json(),
  express.urlencoded({ extended: false }),
  myMulter.upload.array("images"),
]);

server.use([
  userRoute,
  adminRoute,
  loginRoute,
  resetPassword,
  product,
  productInfo,
  order,
]);

server.use("/products", express.static(path.join(__dirname, "products")));
// not found middleWare
server.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});
//error middleWare
server.use((error, req, res, next) => {
  let status = error.status || 500;
  res.status(status).json({ message: "internal error " + error });
});
