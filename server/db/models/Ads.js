var mongoose = require('mongoose');

var Ads = mongoose.model('Ads', {
    title: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        require: true,
        type: String
    },
    mobileNum: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    sellerID: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    }
});
module.exports = { Ads };