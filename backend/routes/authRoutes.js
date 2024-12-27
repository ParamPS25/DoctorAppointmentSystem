const express = require('express');
const router = express.Router();
const { 
    signup, 
    login, 
    logout, 
    getUserProfile,  
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

// Protected routes
router.get('/me', protect, getUserProfile);
router.put('/update-profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

module.exports = router;