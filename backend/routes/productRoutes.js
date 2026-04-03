const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ➕ Add product
router.post("/products", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 📥 Get all products
router.get("/products", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// ✏ Update product
router.put("/products/:id", async (req, res) => {
    const updated = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updated);
});

// ❌ Delete product
router.delete("/products/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
});

// ⚠ Low stock
router.get("/products/low-stock", async (req, res) => {
    const products = await Product.find({
        $expr: { $lte: ["$quantity", "$minStock"] }
    });
    res.json(products);
});

module.exports = router;