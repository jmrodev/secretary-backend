import httpError from "../helpers/handleErrors.js";
import  userModel  from "../models/users.js";

const getItems = async (req, res) => {
  try {
    const resDetail = await userModel.find({});
    res.status(201).json({data:resDetail});
  } catch (error) {
    httpError(res, error); // Asegúrate de pasar res y error a httpError
  }
};

const getItem = () => {};

const createItem = async (req,res) => {
  try {
    const {
      userName,
      name,
      email,
      password,
      role,
      createdAt,
      updatedAt,
      lastLogin,
      isLocked,
      lockUntil,
      loginAttempts,
    } = req.body;
    const resDetail = await userModel.create({
      userName,
      name,
      email,
      password,
      role,
      createdAt,
      updatedAt,
      lastLogin,
      isLocked,
      lockUntil,
      loginAttempts,
    });
    res.status(201).json({data:resDetail});
  } catch (error) {
    httpError(res, error); // Asegúrate de pasar res y error a httpError
  }
};

const updateItem = () => {};

const deleteItem = () => {};

export { getItems, getItem, createItem, updateItem, deleteItem };
