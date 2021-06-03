var express = require("express");
var router = express.Router();

var productController = require("./controller/productController");

router.get("/", function (req, res, next) {
  res.json({
    test: true,
  });
});

router.get("/get-all-products", function (req, res) {
  productController.getAllProducts(function (err, payload) {
    if (err) {
      res.status(500).json({ message: "Error", error: err });
    } else {
      res.json({ message: "success", data: payload });
    }
  });
});

router.get("/get-product-by-id/:id", function (req, res) {
  productController.getProductByID(req.params.id, function (err, payload) {
    if (err) {
      res.status(500).json({ message: "Error", error: err });
    } else {
      res.json({ message: "success", data: payload });
    }
  });
});

router.post("/create-product", function (req, res) {
  productController.createProduct(req.body, function (err, payload) {
    if (err) {
      res.status(500).json({ message: "Error", error: err });
    } else {
      res.json({ message: "success", data: payload });
    }
  });
});

router.put("/update-product-by-id/:id", function (req, res) {
  productController.updateProductByID(req.params.id, req.body, function (err, updatedPayload) {
    if (err) {
      res.status(500).json({ message: "Error", error: err });
    } else {
      res.json({ message: "success", data: updatedPayload });
    }
  });
});

router.delete("/delete-product-by-id/:id", function (req, res) {
  productController.deleteProductByID(req.params.id, function (err, deletedPayload) {
    if (err) {
      res.status(500).json({ message: "Error", error: err });
    } else {
      res.json({ message: "success", data: deletedPayload });
    }
  });
});

module.exports = router;
