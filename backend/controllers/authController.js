const bcrypt = require('bcryptjs');
const BaseUser = require('../models/baseUserSchema');
const Doctor = require('../models/doctorSchema');
const Patient = require('../models/patientSchema');
const Token = require('../models/tokenSchema');
const {sendToken} = require('../services/jwtToken');

async function signup(req,res,next){
    try{
        const {firstname,lastname,email,password,phoneNumber,age,gender,role, ...additionalInfo} = req.body;

        if (!firstname || !lastname || !email || !password || !phoneNumber || !role || !gender) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // if user is already registered
        const existingUser = await BaseUser.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 12); // salt rounds = 12
        
        const baseUser = await BaseUser.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            phoneNumber,
            age,
            gender,
            role
        });

        // role based registration
        if(role === 'doctor'){
            const {specialization, experience,fees} = additionalInfo;
            await Doctor.create({
                baseUserId: baseUser._id,
                specialization,
                experience,
                fees
            });
        }
        else if(role === 'patient'){
            const {medicalHistory} = additionalInfo;
            await Patient.create({
                baseUserId: baseUser._id,
                medicalHistory
            });
        }

        await sendToken(baseUser, 201, res);  // send token in response (generating a JSON Web Token (JWT) for a user and send it back to the client in a cookie)

    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error creating user'
        });
    }
}

async function login(req,res){
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        const user = await BaseUser.findOne({email}).select('+password');
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.status(404).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // removing password from response
        user.password = undefined;
        await sendToken(user, 200, res);  // send token in response

        //error : as we are sending token in response, we don't need to send user in response so , was giving err Cannot set headers after they are sent to the client 
        // as we are already sending response in sendToken function()
        // return res.status(200).json({
        //     success: true,
        //     user
        // });

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error logging in'
        });
    }
}

async function logout(req,res){
    try{
        const refreshToken = req.cookies.refreshToken;

        await Token.findOneAndDelete({ refreshToken });

        // clear cookies
        res.cookie('accessToken', '', {
            expires: new Date(0),
            httpOnly: true
        });
        res.cookie('refreshToken', '', {
            expires: new Date(0),
            httpOnly: true
        });

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });

    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error logging out'
        });
    }
}

// protected via middleware
async function getUserProfile(req,res){
    try{
        const user = await BaseUser.findById(req.user._id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        //role-specific profile
        let profile = null;
        if (user.role === 'doctor') {
            profile = await Doctor.findOne({ baseUserId: user._id });
        } else if (user.role === 'patient') {
            profile = await Patient.findOne({ baseUserId: user._id });
        }

        res.status(200).json({
            success: true,
            data: {
                user,
                profile
            }
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user profile'
        });
    }

}

function getUserRole(req,res,next){
    if (!req.user.role){
        return res.status(400).json({
            success:false,
            message : "user role not exists"
        })
    }

    return res.status(200).json({
        role : req.user.role,
    })
}

module.exports = {
    signup,
    login,
    logout,
    getUserProfile,
    getUserRole
};