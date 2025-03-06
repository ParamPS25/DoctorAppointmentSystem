const Review = require('../models/reviewSchema');
const Doctor = require('../models/doctorSchema');

async function submitReview(req, res) {
    try {
        const { reviewToken } = req.params;
        const { rating, review, isAnonymous } = req.body;

        // Find the review by token , if it is pending => allow to submit review else return error
        const existingReview = await Review.findOne({ 
            reviewToken, 
            reviewStatus: 'pending' 
        });

        if (!existingReview) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired review link'
            });
        }

        // Validate rating value
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Invalid rating. Please provide a value between 1 and 5.'
            });
        }

        // Find the doctor 
        const doctor = await Doctor.findById(existingReview.doctorId);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Update doctor's rating
        const totalRatings = doctor.totalRatings || 0;
        const ratingCount = doctor.ratingCount || 0;
        const newAverageRating = (totalRatings + rating) / (ratingCount + 1);

        doctor.totalRatings = totalRatings + rating;
        doctor.ratingCount = ratingCount + 1;
        doctor.averageRating = newAverageRating;
        await doctor.save();

        // Update review
        existingReview.rating = rating;
        existingReview.review = review || '';
        existingReview.isAnonymous = isAnonymous;
        existingReview.reviewStatus = 'submitted';
        await existingReview.save();

        res.status(200).json({
            success: true,
            message: 'Review submitted successfully',
            averageRating: doctor.averageRating
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to submit review',
            error: err.message
        });
    }
}
async function getReviewDetails(req, res) {
    try {
        const { reviewToken } = req.params;

        // Find the review by token
        const review = await Review.findOne({ 
            reviewToken, 
            reviewStatus: 'pending' 
        }).populate({
            path: 'doctorId',
            populate: {
                path: 'baseUserId',
                select: 'firstname lastname'
            }
        });

        if (!review) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired review link'
            });
        }

        res.status(200).json({
            success: true,
            doctorName: `${review.doctorId.baseUserId.firstname} ${review.doctorId.baseUserId.lastname}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve review details',
            error: err.message
        });
    }
}

module.exports = {
    submitReview,
    getReviewDetails
};
