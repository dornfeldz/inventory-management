const Item = require("../models/item.model");

const getItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (err) {
    console.log(err.message);
  }
};

const createItem = async (req, res) => {
  try {
    const product = await Item.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getItems,
  createItem,
};
