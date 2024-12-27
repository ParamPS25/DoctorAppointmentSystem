const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    baseUserId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'BaseUser', 
        required: true 
    },
    specialization: { 
        type: String 
    },
    experience: { 
        type: Number 
    },
    availability: [
        {
            day: { type: String, required: true },
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
        },
    ],
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment',
        },
    ],
},{timestamps: true});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;