const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    initialItems: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Product', productSchema);