const express = require('express');
const router = express.Router();
const { 
    signup, 
    login, 
    logout, 
    getUserProfile,
    getUserRole  
} = require('../controllers/authController');

const { protect } = require('../middlewares/auth');

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

// Protected routes
router.get('/me', protect, getUserProfile);
router.get('/role',protect,getUserRole);
// router.put('/update-profile', protect, updateProfile);
// router.put('/change-password', protect, changePassword);

module.exports = router;