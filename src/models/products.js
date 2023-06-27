const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productCategory: {
        type: String,
        enum: ['Electronics', 'Fashion & Styles', 'Home', 'Stationary', 'Groceries'],
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stockNumber: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;