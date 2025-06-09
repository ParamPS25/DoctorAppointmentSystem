require('dotenv').config();
const Appointment = require('../models/appointmentSchema');
const BaseUser = require('../models/baseUserSchema')
const Doctor = require('../models/doctorSchema');
const Patient = require('../models/patientSchema');
const Notification = require('../models/notificationSchema');
const Review = require('../models/reviewSchema');
const bcrypt = require('bcryptjs');

const emailTemplate = require('../services/emailTemplateStatus');
const crypto = require('crypto');
const QRCode = require('qrcode')

const puppeteer = require('puppeteer')

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
            message : `You have a new appointment request from ${req.user.email} for ${appointmentDate} on ${appointmentTime} time slot`,
            releatedTo : result._id
        }).save();                    // saving the notification 
        
        const populatedResult = await Appointment.findById(result._id)
        .populate({
            path : 'doctorId',
            select : 'fees specialization',
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

// ********************************************************************************************************************************************

function generateVerificationToken(appointment){
    const data = `${appointment._id}-${appointment.appointmentDate}-${appointment.appointmentTime}`
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    console.log(hash);
    return hash;

}

async function sendAppointmentStatusEmail(appointment,status,doc_fname,doc_lname){
    try{
        const isConfirmed = status === "confirmed"
        let qrCodeDataUrl = '';

        if(isConfirmed){
            // Generate verification token and QR code
            const verificationToken = generateVerificationToken(appointment)

            appointment.verificationToken = verificationToken;
            await appointment.save();

            // Generate QR code
            const qrData = JSON.stringify({
                appointmentId: appointment._id,
                verificationToken: verificationToken
            });

            qrCodeDataUrl = await QRCode.toDataURL(qrData);
        }
    
        const templateData = {
            status : status,
            doctorName : `${doc_fname} ${doc_lname}`,
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            appointmentId: appointment._id,
            headerColor: isConfirmed ? '#4CAF50' : '#f44336',
            statusColor: isConfirmed ? '#4CAF50' : '#f44336',
            isConfirmed: isConfirmed,
            qrCodeDataUrl: qrCodeDataUrl
        }

        const template = handlebars.compile(emailTemplate);
        const htmlContent = template(templateData);

        // const patient = await Patient.findById(appointment.patientId).populate('baseUserId');
        // const patientEmail = patient.baseUserId.email;

        // generate html content file -> pdf using puppeteer
      
        // const browser = await puppeteer.launch();
        // Puppeteer PDF Generation (with Chromium path)
        // const browser = await puppeteer.launch({
        //     executablePath: '/usr/bin/chromium-browser', // Path to Chromium on Render
        // });

        // const page = await browser.newPage();
        // await page.setContent(htmlContent); // Load HTML content into the page
        // const pdfBuffer = await page.pdf({ format: 'A4' }); // Generate PDF
        // await browser.close();

        const patientEmail = appointment.patientId.baseUserId.email ;

        const mailOptions = {
            from : 'bhavsarparam1940@gmail.com',
            to :    patientEmail,
            subject: `Appointment ${status.charAt(0).toUpperCase() + status.slice(1)}`,
            html : htmlContent,
            // attachments: [{
            //     filename: `appointment-${status}.pdf`,
            //     content: pdfBuffer
            // }]
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
            select: 'fees specialization',
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

        // if appointment is already confirmed/cancelled/completed -> to avoid duplicate statuses
        if (appointment.status === status || appointment.status === 'completed') {
            return res.status(400).json({
            success: false,
            message: `Appointment is already ${appointment.status}`,
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

async function sendReviewEmail(appointment) {
    try {
        // Generate unique review token
        const reviewToken = crypto.randomBytes(32).toString('hex');
        // console.log('Review Token:', reviewToken);

        // Create a review entry with default rating of 0
        const review = new Review({
            appointmentId: appointment._id,
            doctorId: appointment.doctorId._id,
            patientId: appointment.patientId._id,
            reviewToken: reviewToken,
            reviewStatus: 'pending',
            rating: 0  // Explicitly set default rating
        });
        await review.save();

        const reviewLink = `${process.env.FRONTEND_URL}/review/${reviewToken}`;      // localhost -> for local testing        
        //console.log('Review Link:', reviewLink);

        // Email template 
        const htmlContent = `
            <h2>Rate Your Doctor</h2>
            <p>Thank you for your appointment with Dr. ${appointment.doctorId.baseUserId.firstname} ${appointment.doctorId.baseUserId.lastname}</p>
            <p>Please take a moment to rate your experience:</p>
            <a href="${reviewLink}">Submit Review</a>
        `;

        const mailOptions = {
            from: 'bhavsarparam1940@gmail.com',
            to: appointment.patientId.baseUserId.email,
            subject: 'Rate Your Recent Appointment',
            html: htmlContent
        };

        await transporter.sendMail(mailOptions);
        return true;
        
    } catch(err) {
        console.error('Error sending review email:', err);
        throw err;
    }
}

// POST : api/book/doctor-scan 
// post appointmentId and verification-token for 

async function doctorScanQR(req,res,next){
    try{
        const {appointmentId, verificationToken} = req.body;
        // const doctorId = req.user.id; mistake here as will give us BaseUserId 
        const userId = req.user.id;
        const doctorId = await Doctor.findOne({baseUserId: userId}).select('_id')

        const appointment = await Appointment.findById(appointmentId)
        .populate({
            path: 'doctorId',
            select: 'fees specialization',
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

        // console.log(appointment.doctorId._id.toString())
        // console.log(doctorId.toString())
        // console.log(appointment.doctorId.toString())

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        //  // Check if the appointment is confirmed
        //  if (appointment.status !== 'confirmed') {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Appointment is not confirmed"
        //     });
        // }

        // Verify token
        if (appointment.verificationToken !== verificationToken) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification token"
            });
        }

        // Verify if the doctor matches
        if (appointment.doctorId._id.toString() !== doctorId._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to verify this appointment"
            });
        }

         // Check if appointment is for today , time is not strictly checked
         const appointmentDate = new Date(appointment.appointmentDate);
         const today = new Date();
         // setting the time of both to midnight(00:00:00:000) this ensures that only the date part is compared, ignoring the time
         appointmentDate.setHours(0,0,0,0);
         today.setHours(0,0,0,0)   
         // for testing book appointment for today so doc can scan qr and verify for correct date wrt appointment date
         console.log('Appointment Date:', appointmentDate.toDateString());
         console.log('Today:', today.toDateString());
         if (appointmentDate.toDateString() !== today.toDateString()) {
             return res.status(400).json({
                 success: false,
                 message: "Appointment is not scheduled for today"
             });
         }

      // Update appointment status to completed
        appointment.status = 'completed';
        await appointment.save();

        // Send  review email to patient after appointment is completed
        await sendReviewEmail(appointment);

        return res.status(200).json({
            success: true,
            message: "Appointment marked as completed and review email sent",
            appointment
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error verifying and updating appointment status",
            error: err.message
        })
    }
}
// GET : api/book/notifications
// get all the notifications for the logged in user, user can be doctor or patient
async function getNotifications(req,res,next){
    try{
        const userId = req.user.id;
        const userRole = req.user.role;

        let recipient, recipientModel;

        if(userRole === 'doctor'){
            const doctor = await Doctor.findOne({baseUserId : userId}).select('_id');
            recipient = doctor._id;
            recipientModel = 'Doctor';
        }else{
            const patient = await Patient.findOne({baseUserId : userId}).select('_id');
            recipient = patient._id;
            recipientModel = 'Patient';
        }

        // pagination
        const page = parseInt(req.query.page) || 1; 
        const limit = 5;
        const skip = (page-1) * limit;

        // finding the notifications with respect to the recipient
        const notifications = await Notification.find({
            recipient,
            recipientModel
        })
        .sort({createdAt : -1})  // Newest notifications first
        .skip(skip)              // Skip the previous notifications
        .limit(limit);           // Limit to the specified number

        // Total count for notifications
        const totalNotifications = await Notification.countDocuments({
            recipient,
            recipientModel
        })

        res.status(200).json({
            success : true,
            page,
            totalPages : Math.ceil(totalNotifications / limit),
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
                    select: 'fees specialization',
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
                })
                .sort({createdAt : -1});
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
                    select: 'fees specialization',
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
                })
                .sort({createdAt : -1});
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

// GET : api/book/calendar-appointments?year=2025&month=2
async function getCalendarAppointments(req, res) {
    try {
        const userId = req.user.id;
        const { year, month } = req.query;

        if (!year || !month) {
            return res.status(400).json({ success: false, message: "Year and month are required" });
        }

        // Ensure the user is a doctor
        const doctor = await Doctor.findOne({ baseUserId: userId }).select('_id');
        if (!doctor) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        // Get first and last day of the month
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0);

        // Fetch only appointments for the doctor in the given month
        const appointments = await Appointment.find({
            doctorId: doctor._id,
            appointmentDate: { $gte: startOfMonth, $lte: endOfMonth }
        }).select("appointmentDate status");

        // Group appointments by date & status for easy front-end mapping
        const calendarData = {};
        appointments.forEach(({ appointmentDate, status }) => {
            const day = new Date(appointmentDate).getDate();
            if (!calendarData[day]) {
                calendarData[day] = [];
            }
            calendarData[day].push(status);
        });

        res.status(200).json({
            success: true,
            calendarData,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to get calendar appointments",
            error: err.message,
        });
    }
}


module.exports = {
    bookAppointment,
    updateAppointmentStatus,
    getNotifications,
    getAllAppointments,
    doctorScanQR,
    getCalendarAppointments
};
