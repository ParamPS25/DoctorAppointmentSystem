// generate a JSON Web Token (JWT) for a user and send it back to the client in a cookie.
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Token = require('../models/tokenSchema');

generateTokens = async (user) => {
    // Payload containing id, email, and role
    const payload = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role
    };

    // Generate access token with complete payload
    const accessToken = jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '50m' }
    );

    // Generate refresh token with same payload
    const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Check if there's an existing refresh token for the user
    const existingToken = await Token.findOne({ userId: user._id });

    // previously there was a bug here, on each login, a new refresh token was created for the user, which was not the correct way to do it. as creates redundant tokens in the database with respect to the user id.

    if (existingToken) {
        // If a refresh token exists, update it with the new one
        existingToken.refreshToken = refreshToken;
        existingToken.expiresAt = expiresAt;
        await existingToken.save();
    } else {
        // If no refresh token exists, create a new one
        await Token.create({
            userId: user._id,
            refreshToken,
            expiresAt
        });
    }


    return { accessToken, refreshToken };
};


exports.sendToken = async (user, statusCode, res) => {
    const { accessToken, refreshToken } = await generateTokens(user);

    // Set CORS Headers for Cookies
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    const accessTokenOptions = {
        expires: new Date(Date.now() + 50 * 60 * 1000),     //expiration is set to 50 minutes from the current time.
        httpOnly: true,                                     //option makes the cookie inaccessible to JavaScript running on the client-side
        secure: process.env.NODE_ENV === 'production',      // Only secure cookies in production
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict'
    };

    const refreshTokenOptions = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',      // Only secure cookies in production
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict'
    };

    // Send user info without sensitive data
    const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber
    };

    return res.status(statusCode)
        .cookie('accessToken', accessToken, accessTokenOptions)
        .cookie('refreshToken', refreshToken, refreshTokenOptions)
        .json({
            success: true,
            user: userResponse
        });
};
