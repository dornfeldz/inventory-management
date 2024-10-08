const Item = require("../models/item.model");

const getItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch items", error: err.message });
  }
};
const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await Item.findById(id);
    res.status(200).json(items);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch item", error: err.message });
  }
};

const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create item", error: err.message });
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
    res
      .status(500)
      .json({ message: "Failed to update item", error: err.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);
    if (!item) res.status(404).json({ message: "Couldn't find item!" });
    res.status(200).json({ message: "Item deleted successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete item", error: err.message });
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
