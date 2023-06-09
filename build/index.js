"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes/routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)({ path: ".env" });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/", routes_1.default);
const port = process.env.PORT || 3000;
mongoose_1.default.connect(process.env.DB_URL, {}).then((db) => {
    console.log("DB is connected");
}).catch((err) => {
    console.log(err);
});
(0, dotenv_1.configDotenv)({ path: ".env" });
//starting server
app.listen(port, () => {
    console.log("Server Initialized", port);
});
module.exports = app;
