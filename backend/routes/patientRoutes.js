const express = require('express');
const {updatePatient} = require('../controllers/patientController');

const router = express.Router();

// router.get('/', getAllPatients);
// router.get('/:id', getPatientById);

router.patch('/update/:patientId', updatePatient);

module.exports = router;