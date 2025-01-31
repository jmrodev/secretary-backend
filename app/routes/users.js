import express from "express";
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/users.js";
import checkOrigin from "../middlewares/origin.js";

const router = express.Router();

router.get("/", getItems);

router.get("/:id", getItem);

router.post("/", checkOrigin, createItem);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);

export default router;
