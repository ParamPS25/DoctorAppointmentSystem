const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BaseUser',
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    isValid: {
        type: Boolean,
        default: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;