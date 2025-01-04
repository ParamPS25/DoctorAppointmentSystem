const Appointment = require('../models/appointmentSchema');
const Doctor = require('../models/doctorSchema');
const Patient = require('../models/patientSchema');
const Notification = require('../models/notificationSchema');

// POST : api/book/:doctorId
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

        await Doctor.findByIdAndUpdate(doctorId, {$push : {appointments : result._id}});  // updating the doctor's appointments array

        // after saving the appointment, we create notification for the doctor

        await new Notification({
            recipient : doctorId,
            recipientModel : 'Doctor',
            title : 'New Appointment Request',
            message : `You have a new appointment request from ${req.user.email} for ${appointmentDate} on ${appointmentTime}`,
            releatedTo : result._id
        }).save();                    // saving the notification 
        
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
            message : "Failed to book appointment",
            err : err.message
        });
    }
}

// Patch : api/book/status/:appointmentId
// here req.user will be the doctor 
async function updateAppointmentStatus(req, res, next) {
    try{
        const appointmentId = req.params.appointmentId;
        const {status} = req.body;          // doctor updates the status of the appointment 

        const appointment = await Appointment.findById(appointmentId)
        .populate('doctorId')
        .populate('patientId');

        if(!appointment){
            return res.status(404).json({
                success : false,
                message : "Appointment not found"
            });
        }

        appointment.status = status;        // status can be 'confirmed' or 'cancelled'
        await appointment.save();

        // after saving the appointment, we create notification for the patient

        const notificationMsg = status === 'confirmed' ? `Your appointment on ${appointment.appointmentDate} at ${appointment.appointmentTime} has been confirmed`
             : `Your appointment on ${appointment.appointmentDate} at ${appointment.appointmentTime} has been cancelled`;

        const notifn = await new Notification({
            recipient : appointment.patientId,
            recipientModel : 'Patient',
            title : 'Appointment Status Update',
            message : notificationMsg,
            releatedTo : appointmentId
        }).save();                    // saving the notification

        // console.log(notifn);
        
        res.status(200).json({
            success : true,
            message : `Appointment ${status} successfully`, 
            appointment                                          // populated appointment
        });
    }catch(err){
        res.status(500).json({
            success : false,
            message : "Failed to update appointment status",
            err : err.message
        });
    }
}

// GET : api/book/notifications
// get all the notifications for the logged in user, user can be doctor or patient
async function getNotifications(req,res,next){
    try{
        const userId = req.user.id;
        const userRole = req.user.role;

        if(userRole === 'doctor'){
            const doctor = await Doctor.findOne({baseUserId : userId}).select('_id');
            recipient = doctor._id;
            recipientModel = 'Doctor';
        }else{
            const patient = await Patient.findOne({baseUserId : userId}).select('_id');
            recipient = patient._id;
            recipientModel = 'Patient';
        }

        // finding the notifications with respect to the recipient
        const notifications = await Notification.find({
            recipient,
            recipientModel
        }).sort({createdAt : -1});

        res.status(200).json({
            success : true,
            notifications    
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message : "Failed to get notifications"
        });
    }
}

// GET : api/book/doc/all
// get all the appointments for the logged in doctor
async function getAllAppointments(req,res,next){
    try{
        const userId = req.user.id;
        const doctor = await Doctor.findOne({baseUserId : userId}).select('_id');

        const appointments = await Appointment.find({doctorId : doctor._id})
        .populate('doctorId')
        .populate('patientId')
        //.sort({appointmentDate : -1});    

        // ! need to implement get user details from patientId as baseUserId is linked to patientId and patientId is linked to appointment
        
        res.status(200).json({  
            success : true,
            appointments
        });

    }catch(err){
        res.status(500).json({
            success : false,
            message : "Failed to get appointments" 
        });
    }
}

module.exports = {
    bookAppointment,
    updateAppointmentStatus,
    getNotifications,
    getAllAppointments
};
