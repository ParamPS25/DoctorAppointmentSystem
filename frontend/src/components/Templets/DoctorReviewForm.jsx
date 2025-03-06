import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// Custom Star Component
const StarIcon = ({ filled, onClick }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        onClick={onClick}
        className={`w-10 h-10 cursor-pointer transition-colors duration-200 ${
            filled ? 'text-yellow-500 fill-current' : 'text-gray-300 stroke-current'
        }`}
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
    >
        <polygon 
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        />
    </svg>
);

const DoctorReviewForm = () => {
    const { reviewToken } = useParams();
    console.log("review token loaded check",reviewToken);
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [doctorName, setDoctorName] = useState('');

    useEffect(() => {
        const fetchReviewDetails = async () => {
            try {
                const NODE_ENV = import.meta.env.VITE_NODE_DOC_API
                const response = await axios.get(`${NODE_ENV}/api/review/details/${reviewToken}`);
                setDoctorName(response.data.doctorName);
            } catch (err) {
                setError('Invalid or expired review link');
            }
        };

        fetchReviewDetails();
    }, [reviewToken]);

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const NODE_ENV = import.meta.env.VITE_NODE_DOC_API
            await axios.patch(`${NODE_ENV}/api/review/submit/${reviewToken}`, {
                rating,
                review,
                isAnonymous
            });

            setSuccess(true);
            setLoading(false);

            // Redirect after 3 seconds
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit review');
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex items-center justify-center min-h-screen w-[100%] min-w-screen bg-green-50">
                <div className="p-8 text-center bg-white rounded-lg shadow-xl">
                    <h2 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h2>
                    <p className="text-green-700 text-xl">Your review has been submitted successfully.</p>
                    <p className="mt-4 text-gray-500">Redirecting to home page...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen w-[100%] min-w-screen bg-red-50">
                <div className="p-8 text-center bg-white rounded-lg shadow-xl">
                    <h2 className="text-3xl font-bold text-red-600 mb-4">Error</h2>
                    <p className="text-red-700">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen w-[100%] min-w-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Rate Your Experience</h2>
                
                {doctorName && (
                    <p className="text-center text-gray-600 mb-4">
                        How was your appointment with Dr. {doctorName}?
                    </p>
                )}

                <div className="flex justify-center mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                            key={star}
                            filled={star <= rating}
                            onClick={() => handleStarClick(star)}
                        />
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label 
                            htmlFor="review" 
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Additional Comments (Optional)
                        </label>
                        <textarea
                            id="review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            placeholder="Share your experience..."
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="anonymous"
                            checked={isAnonymous}
                            onChange={() => setIsAnonymous(!isAnonymous)}
                            className="mr-2 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="anonymous" className="text-sm text-gray-700">
                            Submit review anonymously
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={rating === 0 || loading}
                        className={`w-full py-3 rounded-lg transition-colors duration-300 ${
                            rating === 0 || loading
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        }`}
                    >
                        {loading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DoctorReviewForm;