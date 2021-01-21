const express = require("express");
const helmet = require("helmet");
const cors = require("helmet");

const services = require("./services");

const {
  badRequestErrorHandler,
  notFoundErrorHandler,
  unauthorizedErrorHandler,
  forbiddenErrorHandler,
  catchAllErrorHandler,
} = require("./errorHandling");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

const port = process.env.PORT || 3003;

server.use("/api", services);

server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(forbiddenErrorHandler);
server.use(unauthorizedErrorHandler);
server.use(catchAllErrorHandler);

server.listen(port, () => {
  console.info("Server is running on port: ", port);
});

server.on("error", (err) => {
  console.error("Error : server is not running: ", err);
});
