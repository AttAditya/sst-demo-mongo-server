const productModel = require("../models/product.model");

async function getAllProducts(req, res) {
    const products = await productModel.find();
    return res.json(products);
}

async function getProduct(req, res) {
    const id = req.params.id;
    const product = await productModel.findById(id);

    return res.json(product);
}

async function createProduct(req, res) {
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
}

async function updateProduct(req, res) {
    const id = req.params.id;
    const body = req.body;
    
    await productModel.findByIdAndUpdate(id, {
        name: body.name,
        price: body.price,
        isInStock: body.isInStock,
        category: body.category
    });

    const updatedProduct = await productModel.findById(id);

    return res.json({
        message: "Product Updated",
        product: updatedProduct
    });
}

async function deleteProduct(req, res) {
    const id = req.params.id;
    const product = await productModel.findByIdAndDelete(id);

    return res.json({
        message: "Product Deleted",
        product: product
    });
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};

