const Patient = require('../models/patientSchema');
const BaseUser = require('../models/baseUserSchema');

const updatePatient = async (req, res) => {
    const patientId  = req.params.patientId;
    const {firstname, lastname, age, gender, phoneNumber, email, medicalHistory} = req.body;

    // console.log(updatedPatientData); Check the updated patient data in the console

    try {
        const patient = await Patient.findByIdAndUpdate(patientId, medicalHistory, { new: true });
        const baseUserId = patient.baseUserId;
        const user = await BaseUser.findByIdAndUpdate(baseUserId, {firstname, lastname, age,gender, phoneNumber, email}, { new: true });

        if (!patient || !user) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // as from response of structure data of http://localhost:8000/api/patient/update/me{
        //     "user": {
        //        ... 
        //     }
        //     "profile": {
        //        ...
        //     }
        // is like this and we are displaying the same structure in the frontend so, here we are returning the same structure
        
        res.status(200).json({
            message: 'Patient updated successfully',
            // patient                                     // Return the updated patient for frontend to display
            
            patient : {
                user : user,
                profile : patient
            }
            
        });

    } catch (error) {   
        res.status(500).json({ message: error.message });
    }
}

module.exports = { 
    updatePatient 
};