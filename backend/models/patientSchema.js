const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    baseUserId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'BaseUser', 
        required: true 
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