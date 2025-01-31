import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbconnect from "./config/mongo.js";
import index from "./app/routes/index.js";
import corsMiddleware from "./app/middlewares/cors.js";


dotenv.config();

const app = express();
const port = process.env.PORT;

corsMiddleware(app);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use("/api", index);

dbconnect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
