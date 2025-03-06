const express = require('express');

const {submitReview,getReviewDetails} = require('../controllers/reviewController');

const router = express.Router();

router.get('/details/:reviewToken',getReviewDetails)
router.patch('/submit/:reviewToken', submitReview);

module.exports = router;