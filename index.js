const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const mongoPass = "GYHwFM9LEQTUZwko";
const mongoURI = `mongodb+srv://attachmentaditya:${mongoPass}@cluster0.khodonw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

mongoose.connect(mongoURI).then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log("Failed to connect to Database");
    console.log(`Recieved Error: ${err}`);
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    isInStock: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const productModel = mongoose.model("Products", productSchema);

app.get("/postman", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/products", async (req, res) => {
    const products = await productModel.find();
    return res.json(products);
});

app.get("/api/products/:id", async (req, res) => {
    const id = req.params.id;
    const product = await productModel.findById(id);

    return res.json(product);
});

app.post("/api/products", async (req, res) => {
    const body = req.body;
    const product = await productModel.create({
        name: body.name,
        price: body.price,
        isInStock: body.isInStock,
        category: body.category
    });

    return res.status(201).json({
        message: "Product Created",
        product: product
    });
});

app.put("/api/products/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const product = await productModel.findByIdAndUpdate(id, {
        name: body.name,
        price: body.price,
        isInStock: body.isInStock,
        category: body.category
    });

    return res.json({
        message: "Product Updated",
        product: product
    });
});

app.delete("/api/products/:id", async (req, res) => {
    const id = req.params.id;
    const product = await productModel.findByIdAndDelete(id);

    return res.json({
        message: "Product Deleted",
        product: product
    });
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});