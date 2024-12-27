const jwt = require('jsonwebtoken');
const BaseUser = require('../models/baseUserSchema');
const Token = require('../models/tokenSchema');
const generateTokens = require("../services/jwtToken");

// 1. get access token from cookie, if no access token, return 401
// 2. verify the access token, if invalid, get refresh token from cookie
// 3. if no refresh token, return 401 'ask user to login again'
// 4. verify the refresh token , if no user found with the id in the token, return 401
// 5. if refresh token is valid, generate new access token and set it in cookie
// 6. set the user in request property , next()
// 8. if any error, return 500

async function protect(req,res,next){
    try{
        const accessToken = req.cookies.accessToken;

        if(!accessToken){
            return res.status(401).json({message: 'Login to access this resource'});
        }

        try{
            const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            // console.log(decoded);
            // setting the decoded user in the request property
            req.user = await BaseUser.findById(decoded.id);
            next();

        }catch(error){
            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) {
                return res.status(401).json({ message: 'Please login again' });
            }

                try{
                    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                    const user = await BaseUser.findById(decoded.id);
                    if (!user) {
                        return res.status(401).json({ message: 'user not found, login again' });
                    }

                    const newToken = await generateTokens(user);            // generate new access token and set it in cookie
                    res.cookie('accessToken', newToken.accessToken, {
                        expires: new Date(Date.now() + 15 * 60 * 1000),
                        httpOnly: true,
                        sameSite: 'strict'
                    });

                    req.user = await BaseUser.findById(decoded.id);
                    next();

                    }catch(refreshError){
                        return res.status(401).json({ message: 'Invalid refresh token' });
                    }
            }
    }catch(error){
        res.status(500).json({message: 'Error authenticating user'});
    }
};

function authorize(...roles){
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json(
                {message: 'Unauthorized access'}
            );
        }
        next();
    }   //The return statement ensures that the function exits immediately after sending the response, so next() is not called.
}

BaseUser.modelName


module.exports = {
    protect, 
    authorize
};