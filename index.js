const serverless = require("serverless-http");
const app = require("./build/index");
exports.handler = serverless(app);
