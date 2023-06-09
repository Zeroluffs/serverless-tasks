import express from "express";
import cors from "cors";
import router from './routes/routes';
import mongoose from "mongoose";
import {configDotenv} from "dotenv";
configDotenv({path: ".env"});

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", router);

const port = process.env.PORT || 3000;

mongoose.connect(process!.env!.DB_URL!, {}).then((db) => {
    console.log("DB is connected");
}).catch((err) => {
    console.log(err);
});
configDotenv({path: ".env"});

//starting server
app.listen(port, () => {
    console.log("Server Initialized", port);
});

module.exports = app;