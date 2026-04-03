const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes"); // ✅ add here

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/inventoryDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
app.use("/api", productRoutes);  // ✅ move here

// Test route
app.get("/", (req, res) => {
    res.send("API is running");
});

// Port
app.listen(5000, () => {
    console.log("Server running on port 5000");
});