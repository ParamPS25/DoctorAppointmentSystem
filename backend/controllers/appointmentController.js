const Appointment = require('../models/appointmentSchema');
const Doctor = require('../models/doctorSchema');
const Patient = require('../models/patientSchema');

async function bookAppointment(req, res, next) {
    try{
        const doctorId = req.params.doctorId;
        const userId = req.user.id
        const patientId = await Patient.findOne({baseUserId: userId}).select('_id');
        const {appointmentTime,appointmentDate,notes} = req.body;

        const appointment = new Appointment({
            patientId,
            doctorId,
            appointmentTime,
            appointmentDate,
            status : 'pending',
            notes
        });

        const result = await appointment.save();

        const populatedResult = await Appointment.findById(result._id)
        .populate('doctorId' )
        .populate('patientId');

        res.status(201).json({
            success : true,
            message : "Appointment booked successfully",
            populatedResult         // populatedResult containing the doctor and patient details
        });
        
    }catch(err){
        res.status(500).json({
            success : false,
            message : "Failed to book appointment"
        });
    }
}

module.exports = {
    bookAppointment
};
