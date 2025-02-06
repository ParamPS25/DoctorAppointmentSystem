const router = require('express').Router();

const {protect} = require('../middlewares/auth');
const {isPatient,appointmentValidation,isDoctor } = require('../middlewares/appointmentMiddleware');

const {bookAppointment,updateAppointmentStatus,getNotifications,getAllAppointments,doctorScanQR,getCalendarAppointments} = require('../controllers/appointmentController');

// Place specific routes first
router.post('/doctor-scan', protect, isDoctor, doctorScanQR);

// api/book/:doctorId    (isLoggedin -> isPatient -> appointmentValidation)
router.post('/:doctorId', protect,isPatient,appointmentValidation, bookAppointment);

router.get('/all-appointments', protect, getAllAppointments);

router.patch('/status/:appointmentId', protect ,isDoctor, updateAppointmentStatus);

router.get('/notifications', protect, getNotifications);

// router.post('/doctor-scan', protect, isDoctor, doctorScanQR);
// Dynamic Segment Collision:
// When defining routes like /:doctorId and /doctor-scan, Express might treat /doctor-scan as a potential :doctorId value. Therefore, the middleware stack for /:doctorId is being executed for /doctor-scan.

// soln :- Express matches routes in the order they are defined, so /doctor-scan will no longer conflict with /:doctorId on placing  /doctor-scan above /:doctorId in the router:

// route for fetching appointments in calendar format
router.get('/calendar-appointments', protect, isDoctor, getCalendarAppointments);

module.exports = router;
