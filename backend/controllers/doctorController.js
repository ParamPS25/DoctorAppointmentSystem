// import Doctor from '../models/doctorSchema.js';
// import BaseUser from '../models/baseUserSchema.js';

const Doctor = require('../models/doctorSchema.js');
const BaseUser = require('../models/baseUserSchema.js');

// implement pagination,filtering and sorting later
async function getAllDoctors(req, res) {
    try{
        const doctors = await Doctor.find().populate('baseUserId');
        res.status(201).json({
            message : "success",
            doctors
        });
    }catch(err){    
        res.status(500).json({
            message : "Failed to get doctors"
        });
    }
}

async function getDoctorById(req, res) {
    try{
        const doctor = await Doctor.findById(req.params.id).populate('baseUserId');
        res.status(201).json({
            message : "success",
            doctor
        });
    }catch(err){
        res.status(500).json({
            message : "Failed to get doctor"
        });
    }
}

// async function rateDoctor(req, res) {
//     try {
//       const docId = req.params.doctorId;
//       const { rating } = req.body;
  
//       // Validate the rating value
//       if (!rating || rating < 1 || rating > 5) {
//         return res.status(400).json({
//           message: 'Invalid rating. Please provide a value between 1 and 5.',
//         });
//       }
  
//       // Find the doctor by ID
//       const doctor = await Doctor.findById(docId);
//       if (!doctor) {
//         return res.status(404).json({
//           message: 'Doctor not found',
//         });
//       }
  
//       // Update the doctor's ratings
//       const totalRatings = doctor.totalRatings || 0;
//       const ratingCount = doctor.ratingCount || 0;
  
//       // Calculate new average rating
//       const newAverageRating = (totalRatings + rating) / (ratingCount + 1);
  
//       // Update fields
//       doctor.totalRatings = totalRatings + rating;
//       doctor.ratingCount = ratingCount + 1;
//       doctor.averageRating = newAverageRating;
  
//       await doctor.save();
  
//       res.status(200).json({
//         message: 'Rating submitted successfully',
//         averageRating: doctor.averageRating,
//       });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({
//         message: 'Failed to rate doctor',
//       });
//     }
//   }
  
  async function AddDoctorLocation(req, res) {
    try {
      const docId = req.params.doctorId;
      const { location } = req.body;
  
      // console.log('Updating location for doctor:', docId);
      // console.log('Request body:', req.body);
  
      // Validate the location object
      if (!location || 
          typeof location !== 'object' ||  
          !location.buildingInfo ||
          !location.streetName ||
          !location.cityName ||
          !location.stateName) {
        return res.status(400).json({
          success: false,
          message: "Invalid location, please provide all the fields of location"
        });
      }
  
      const doctor = await Doctor.findById(docId).exec();
      // console.log('Doctor found:', doctor);
  
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: "Doctor not found"
        });
      }
  
      // Update the location
      doctor.location = location;
      const updatedDoctor = await doctor.save();
      // console.log('Doctor location updated:', updatedDoctor);
  
      return res.status(200).json({
        success: true,
        message: "Location updated successfully",
        data: {
          location: updatedDoctor.location
        }
      });
  
    } catch (err) {
      // console.error('Error in AddDoctorLocation:', err); 
      return res.status(500).json({
        success: false,
        message: "Failed to update location",
        error: err.message
      });
    }
  }
  

module.exports = {
    getAllDoctors,
    getDoctorById,
    // rateDoctor,
    AddDoctorLocation
};