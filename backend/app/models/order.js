const mongoose = require('mongoose');

const Schema = mongoose.Schema



const orderSchema = new Schema({
    customerId: {
        type: String,
        ref: "User",
        required: true
    },
    items: {
        type: Array,
        required: true,
    },
    address: {
        type: String,
        default: 'customer'
    },
    status: {
        type: String,
        default: 'processing'
    }
}, { timestamps: true });


module.exports = mongoose.model('Order', orderSchema);