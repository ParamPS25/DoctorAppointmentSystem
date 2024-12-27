const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient', 
        required: true 
    },
    symptoms: { 
        type: [String], 
        required: true 
    },
    predictedDisease: { 
        type: String, 
        required: true 
    },
    predictionDate: {
        type: Date, 
        default: Date.now 
    },
});

const Prediction = mongoose.model('Prediction', predictionSchema);
module.exports = Prediction;