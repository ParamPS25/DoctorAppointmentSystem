const {body, param,validationResult} = require('express-validator'); // to validate incoming request data 

const Patient = require('../models/patientSchema');
const Doctor = require('../models/doctorSchema');
const Appointment = require('../models/appointmentSchema');

async function isPatient(req,res,next){
    try{
        if(req.user.role !== 'patient'){
            //console.log('isPatient middleware:', req.user);
            return res.status(403).json({
                message: 'Unauthorized access (Only patients can book appointments)'
            });
        }
        next();
    }catch(err){
        res.status(500).json({message: 'Server error'});
    }
    
}

async function isDoctor(req,res,next){
    try{
        if(req.user.role !== 'doctor'){
            return res.status(403).json({
                message: 'Unauthorized access (Only doctors can update appointment status)'
            });
        }
        next();
    }catch(err){
        res.status(500).json({message: 'Server error'});
    }
}

const appointmentValidation = [

    // Validate doctorId from params
        param('doctorId')
        .notEmpty()
        .isMongoId()
        .withMessage('Valid Doctor id is required')
        .custom(async (value) => {
            const doctor = await Doctor.findById(value);
            if (!doctor) {
                throw new Error('Doctor not found');
            }
            return true;
        }),


        body('appointmentDate')
        .notEmpty()
        .withMessage('Appointment date is required')
        .isDate()
        .withMessage('Valid appointment date is required')
        .custom(value => {
            const date = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date >= today;
        })
        .withMessage('Appointment date should be in the future'),

        body('appointmentTime')
        .notEmpty()
        .withMessage('Appointment time is required')
        .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
        .withMessage('Valid appointment time is required (HH:MM format)'),

        body('notes')
        .optional()
        .isString()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Notes must not exceed 1000 characters'),


    // Custom validation to check if the appointment time slot is already booked
    // Check if there is an appointment with the same doctor on the same date and time and status is not cancelled or completed
    body().custom(async (value, { req }) => {
        const existingAppointment = await Appointment.findOne({
            doctorId: req.params.doctorId,
            appointmentDate: req.body.appointmentDate,
            appointmentTime: req.body.appointmentTime,
            status: { $nin: ['cancelled']}
        });

        if (existingAppointment) {
            throw new Error('This time slot is already booked');
        }
        return true;
    }),


    (req, res, next) => {
        const errors = validationResult(req);                            // Collect errors from express-validator , if any 
        if (!errors.isEmpty()) {                                        // If there are errors
            return res.status(400).json({ errors: errors.array() });    //Gets the validation errors as an array.
        }
        next();     // If no errors proceed to next middleware
    }
];

module.exports = {
    isPatient, 
    appointmentValidation,
    isDoctor
};