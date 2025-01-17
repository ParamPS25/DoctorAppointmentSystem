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


module.exports = {
    getAllDoctors,
    getDoctorById,
};