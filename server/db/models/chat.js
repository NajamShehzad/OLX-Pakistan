var mongoose = require('mongoose');

var Chat = mongoose.model('Chat', {
    sellerID: {
        type: String,
        required: true
    },
    sellerName: {
        type: String,
        required: true
    },
    buyerName: {
        type: String,
        required: true
    },
    buyerID: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productID: {
        type: String,
        required: true
    },
    chat: {
        type: Array,
        default: []
    }
});
module.exports = { Chat };