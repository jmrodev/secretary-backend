import httpError from "../helpers/handleErrors.js";
import  userModel  from "../models/users.js";

const getItems = (req, res) => {
  res.send({
    list: [
      {
        id: 1,
        name: "item 1",
      },
      {
        id: 2,
        name: "item 2",
      },
    ],
  });
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
    res.send({ data: resDetail });
  } catch (error) {
    httpError(req, error);
  }
};

const updateItem = () => {};

const deleteItem = () => {};

export { getItems, getItem, createItem, updateItem, deleteItem };
