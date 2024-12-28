const mongoose = require("mongoose");

const baseUserSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true,
    },
    phoneNumber: {
        type: String,
        required : true
    },
    age : {
        type : Number,
        required : true,
    },
    gender: { 
        type: String, 
        enum: ['male', 'female', 'other'] 
    },
    role : {
        type : String,
        enum : ['patient', 'doctor', 'admin'],
        default : 'patient', 
        required: true
    }
}, { timestamps: true });

const BaseUser = mongoose.model('BaseUser', baseUserSchema);

module.exports = BaseUser;