const express = require('express');
const doctorController = require('../controllers/doctorController');

const{getAllDoctors,getDoctorById,rateDoctor,AddDoctorLocation} = require('../controllers/doctorController');

const router = express.Router();

// Route to get all doctors
router.get('/', getAllDoctors);

router.get('/:id', getDoctorById);

router.patch('/location/:doctorId', AddDoctorLocation);

// router.patch('/rate/:doctorId', rateDoctor);


// router.put('/:id', updateDoctor);
// router.delete('/:id', deleteDoctor);


module.exports = router;