const router = require('express').Router();

const {protect} = require('../middlewares/auth');
const {isPatient,appointmentValidation } = require('../middlewares/appointmentMiddleware');

const {bookAppointment} = require('../controllers/appointmentController');

// api/book/:doctorId
router.post('/:doctorId', protect,isPatient,appointmentValidation, bookAppointment);

module.exports = router;
