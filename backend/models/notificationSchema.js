const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
     recipient:{
        type : mongoose.Schema.Types.ObjectId,
        refPath : 'recipientModel',
        required : true
     },

    recipientModel:{
        type : String,
        required : true,
        enum : ['Patient','Doctor']
    },

    title : {
        type : String,
        required : true
    },
    
    message : {
        type : String,
        required : true
    },
    
    releatedTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Appointment',
        required : true
    },

    isRead : {
        type : Boolean,
        default : false
    }
},{timestamps: true});

const Notification = mongoose.model('Notification',notificationSchema);

module.exports = Notification;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// the recipientModel field is used to store the type of the recipient, whether it is a patient or a doctor.
// it allows same notification schema to be used for both patients and doctors.
// the recipient field is used to store the id of the recipient.
// the releatedTo field is used to store the id of the appointment to which the notification is related.


// const doctorNotification = new Notification({
//     recipient: doctorId,          // The actual ID of the doctor
//     recipientModel: 'Doctor',     // Specifies that recipient is a Doctor
//     title: 'New Appointment',
//     message: 'You have a new appointment request'
// });

// // When creating a notification for a patient
// const patientNotification = new Notification({
//     recipient: patientId,         // The actual ID of the patient
//     recipientModel: 'Patient',    // Specifies that recipient is a Patient
//     title: 'Appointment Update',
//     message: 'Your appointment has been confirmed'
// });

//  the recipientModel serves as a discriminator field that specifies the type of the recipient.
// 1.) so, can populate the recipient field based on the recipientModel field.

// await Notification.findById(notificationId).populate('recipient');

// the above code will populate the recipient field based on the recipientModel field.

// 2.) enums ensure that the recipientModel field can only have the values 'Patient' or 'Doctor'.
