const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
  },
});

module.exports = mongoose.model("product", productSchema);
