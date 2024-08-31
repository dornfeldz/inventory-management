const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const itemRoute = require("./routes/item.route.js");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "Hello Inventory!" });
});

app.use("/api/items", itemRoute);

mongoose
  .connect(process.env.DB_CONN)
  .then(() => {
    console.log("Connected to DB!");
    app.listen(3000, () => {
      console.log("App is running on port 3000...");
    });
  })
  .catch(() => {
    console.log("Conection failed!");
  });

module.exports = app;
