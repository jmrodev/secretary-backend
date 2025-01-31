import express from "express";
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/users.js";
import validateToken from "../middlewares/auth.js";
import logHeaders from "../middlewares/logHeaders.js";

const router = express.Router();

router.use(logHeaders);

router.get("/", getItems);

router.get("/:id", getItem);

router.post("/", validateToken, createItem);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);

export default router;
