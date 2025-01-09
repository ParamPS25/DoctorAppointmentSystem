const Appointment = require('../models/appointmentSchema');
const BaseUser = require('../models/baseUserSchema')
const Doctor = require('../models/doctorSchema');
const Patient = require('../models/patientSchema');
const Notification = require('../models/notificationSchema');
const emailTemplate = require('../services/emailTemplateStatus');

const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const transporter = require('../services/nodeMailerAuth');

// POST : api/book/:doctorId
async function bookAppointment(req, res, next) {
    try{
        const doctorId = req.params.doctorId;
        const userId = req.user.id
        const patient = await Patient.findOne({baseUserId: userId}).select('_id firstname lastname');
        const {appointmentTime,appointmentDate,notes} = req.body;

        const appointment = new Appointment({
            patientId: patient._id,
            doctorId,
            appointmentTime,
            appointmentDate,
            status : 'pending',
            notes
        });

        const result = await appointment.save();

        // no need to push the appointments in doc appointments arr as already created seperate appointments schema 
        // await Doctor.findByIdAndUpdate(doctorId, {$push : {appointments : result._id}});  // updating the doctor's appointments array

        // after saving the appointment, we create notification for the doctor

        await new Notification({
            recipient : doctorId,
            recipientModel : 'Doctor',
            title : 'New Appointment Request',
            message : `You have a new appointment request from ${req.user.email} for ${appointmentDate} on ${appointmentTime}`,
            releatedTo : result._id
        }).save();                    // saving the notification 
        
        const populatedResult = await Appointment.findById(result._id)
        .populate({
            path : 'doctorId',
            select : 'fee specialization',
            populate : {
                path : 'baseUserId',
                select : 'firstname lastname email'
            }
        })
        .populate({
            path: 'patientId',
            populate: {
                path: 'baseUserId',
                select: 'firstname lastname email',
            },
        });

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

async function sendAppointmentStatusEmail(appointment,status,doc_fname,doc_lname){
    try{
        const isConfirmed = status === "confirmed"

        const templateData = {
            status : status,
            doctorName : `${doc_fname} ${doc_lname}`,
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            appointmentId: appointment._id,
            headerColor: isConfirmed ? '#4CAF50' : '#f44336',
            statusColor: isConfirmed ? '#4CAF50' : '#f44336',
            isConfirmed: isConfirmed
        }

        const template = handlebars.compile(emailTemplate);
        const htmlContent = template(templateData);

        // const patient = await Patient.findById(appointment.patientId).populate('baseUserId');
        // const patientEmail = patient.baseUserId.email;

        const patientEmail = appointment.patientId.baseUserId.email ;

        const mailOptions = {
            from : 'bhavsarparam1940@gmail.com',
            to :    patientEmail,
            subject: `Appointment ${status.charAt(0).toUpperCase() + status.slice(1)}`,
            html : htmlContent,
            attachments: [{
                filename: `appointment-${status}.html`,
                content: htmlContent
            }]
        };

        // send mail
        await transporter.sendMail(mailOptions);
        return true;
        
    } catch(err){
        console.error('Error sending appointment email:', err);
        throw err;
    }
}

// Patch : api/book/status/:appointmentId
// here req.user will be the doctor 
async function updateAppointmentStatus(req, res, next) {
    try{
        const appointmentId = req.params.appointmentId;
        const {status} = req.body;          // doctor updates the status of the appointment 

        const appointment = await Appointment.findById(appointmentId)
        .populate({
            path: 'doctorId',
            select: 'fee specialization',
            populate: {
                path: 'baseUserId',
                select: 'firstname lastname email',
            },
        })
        .populate({
            path: 'patientId',
            populate: {
                path: 'baseUserId',
                select: 'firstname lastname email',
            },
        });

        if(!appointment){
            return res.status(404).json({
                success : false,
                message : "Appointment not found"
            });
        }

        // check if req.user doc is same as releated with appointmentId
        // if(appointment.doctorId !== req.user.id){
        //     return res.status(403).json({
        //         success : false,
        //         message : "Unauthorized access"
        //     })
        // }

        // if appointment is already confirmed/cancelled -> to avoid duplicate statuses
        if ((appointment.status === status)) {
            return res.status(400).json({
                success: false,
                message: `Appointment is already ${status}`,
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

        // send email for confirmation or cancellation , // as here req.user will be doctor
        const doc_fname = req.user.firstname
        const doc_lname = req.user.lastname
        await sendAppointmentStatusEmail(appointment,status,doc_fname,doc_lname); 

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

// GET : api/book/all-appointments
// get all the appointments for the logged in doctor or patient
async function getAllAppointments(req, res, next) {
    try {
        const userId = req.user.id; // Logged-in user's ID

        // Check if the user is a doctor
        const doctor = await Doctor.findOne({ baseUserId: userId }).select('_id');
        
        let appointments;

        if (doctor) {
            // If the user is a doctor, fetch appointments for the doctor
            appointments = await Appointment.find({ doctorId: doctor._id })
                .populate({
                    path: 'doctorId',
                    select: 'fee specialization',
                    populate: {
                        path: 'baseUserId',
                        select: 'firstname lastname email',
                    },
                })
                .populate({
                    path: 'patientId',
                    populate: {
                        path: 'baseUserId',
                        select: 'firstname lastname email',
                    },
                });
        } else {
            // If the user is not a doctor, check if they are a patient
            const patient = await Patient.findOne({ baseUserId: userId }).select('_id');

            if (!patient) {
                return res.status(404).json({
                    success: false,
                    message: "User is neither a doctor nor a patient",
                });
            }

            // Fetch appointments for the patient
            appointments = await Appointment.find({ patientId: patient._id })
                .populate({
                    path: 'doctorId',
                    select: 'fee specialization',
                    populate: {
                        path: 'baseUserId',
                        select: 'firstname lastname email',
                    },
                })
                .populate({
                    path: 'patientId',
                    select: 'medicalHistory', // Include medical history from Patient
                    populate: {
                        path: 'baseUserId',
                        select: 'firstname lastname email',
                    },
                });
        }

        // Send response
        res.status(200).json({
            success: true,
            appointments,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to get appointments",
            error: err.message,
        });
    }
}


module.exports = {
    bookAppointment,
    updateAppointmentStatus,
    getNotifications,
    getAllAppointments
};
