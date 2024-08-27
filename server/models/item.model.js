const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema(
  {
    inventory_id: {
      type: Number,
      required: [true, "Please enter an inventory id!"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please add a name!"],
    },
    model: {
      type: String,
    },
    depot: {
      type: String,
      required: [true, "Please add a depot!"],
    },
    price: {
      type: Number,
    },
  },
  {
    timestamp: true,
  }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
