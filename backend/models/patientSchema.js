const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    baseUserId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'BaseUser', 
        required: true 
    },
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Other'] 
    },
    medicalHistory: [
        {
            disease: { type: String },
            date: { type: Date },
            notes: { type: String },
        },
    ],
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;