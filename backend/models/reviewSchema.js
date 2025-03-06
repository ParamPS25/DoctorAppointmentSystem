const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    rating: {
        type: Number,
        min: 0,  // Allow 0 as a default/unrated state
        max: 5,
        default: 0  // Set a default value of 0
    },
    review: {
        type: String,
        trim: true,
        maxlength: 500
    },
    isAnonymous: {
        type: Boolean,
        default: false
    },
    reviewStatus: {
        type: String,
        enum: ['pending', 'submitted'],
        default: 'pending'
    },
    reviewToken: {
        type: String,
        unique: true
    }
}, { timestamps: true });

// Pre-save hook to ensure rating is between 0 and 5
reviewSchema.pre('save', function(next) {
    if (this.rating !== undefined) {
        this.rating = Math.max(0, Math.min(5, this.rating));
    }
    next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;