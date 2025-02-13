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
    fees: { 
        type: Number 
    },
    totalRatings: { 
        type: Number, 
        default: 0 // Keeps a sum of all ratings received 
    },
    ratingCount: { 
        type: Number, 
        default: 0 // Tracks the number of ratings 
    },
    averageRating: { 
        type: Number, 
        default: 0 // Stores the average rating for easy access 
    },
    location: { 
        buildingInfo: { type: String },
        streetName: { type: String },
        cityName: { type: String },
        stateName: { type: String },
    },
    // availability: [
    //     {
    //         day: { type: String, required: true },
    //         startTime: { type: String, required: true },
    //         endTime: { type: String, required: true },
    //     },
    // ],
    // appointments: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Appointment',
    //     },
    // ],
},{timestamps: true});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;