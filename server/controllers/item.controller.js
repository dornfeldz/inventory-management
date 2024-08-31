const Item = require("../models/item.model");

const getItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (err) {
    console.log(err.message);
  }
};
const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await Item.findById(id);
    res.status(200).json(items);
  } catch (err) {
    console.log(err.message);
  }
};

const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    console.log(err.message);
    console.log(req.body);
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const item = await Item.findByIdAndUpdate(id, updatedData, { new: true });
    if (!item) res.status(404).json({ message: "Item not found!" });
    res.status(200).json({ message: "Item updated successfully!" });
  } catch (err) {
    console.log(err);
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);
    if (!item) res.status(404).json({ message: "Couldn't find item!" });
    res.status(200).json({ message: "Item deleted successfully!" });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
