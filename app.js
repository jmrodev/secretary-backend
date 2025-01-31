import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbconnect from "./config/mongo.js";
import index from "./app/routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",index);

dbconnect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
