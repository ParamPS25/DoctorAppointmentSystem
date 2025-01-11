const router = require('express').Router();

const {protect} = require('../middlewares/auth');
const {isPatient,appointmentValidation,isDoctor } = require('../middlewares/appointmentMiddleware');

const {bookAppointment,updateAppointmentStatus,getNotifications,getAllAppointments,doctorScanQR} = require('../controllers/appointmentController');

// api/book/:doctorId    (isLoggedin -> isPatient -> appointmentValidation)
router.post('/:doctorId', protect,isPatient,appointmentValidation, bookAppointment);

router.get('/all-appointments', protect, getAllAppointments);

router.patch('/status/:appointmentId', protect ,isDoctor, updateAppointmentStatus);

router.get('/notifications', protect, getNotifications);

router.post('/doctor-scan', protect, isDoctor, doctorScanQR);

// !! email notification for appointment status 

module.exports = router;
