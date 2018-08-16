const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const tokenPass = process.env.tokenPass|| 'abc123';


var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    name:{
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    favorite :{
        type:Array,
        default:[]
    },

});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email','name','favorite']);
};

UserSchema.statics.findByToken = function (token) {

    var user = this;
    var decoded;
    try {
        decoded = jwt.verify(token, tokenPass)
    } catch (err) {
        return Promise.reject();
    }
    return Users.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.methods.removeToken = function (token) {

    var user = this;
    console.log(user);
    
   return user.update({
        $pull: {
            tokens: {
                token
            }
        }

    });


}


var Users = mongoose.model('User', UserSchema);

module.exports = { Users };