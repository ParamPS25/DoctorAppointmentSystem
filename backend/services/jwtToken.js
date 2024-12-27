// generate a JSON Web Token (JWT) for a user and send it back to the client in a cookie.

const jwt = require('jsonwebtoken');
const Token = require('../models/Token');

exports.generateTokens = async (user) => {
    // Payload containing id, email, and role
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };

    // Generate access token with complete payload
    const accessToken = jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '15m' }
    );

    // Generate refresh token with same payload
    const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Store refresh token in database
    await Token.create({
        userId: user._id,
        refreshToken,
        expiresAt
    });

    return { accessToken, refreshToken };
};


exports.sendTokens = async (user, statusCode, res) => {
    const { accessToken, refreshToken } = await exports.generateTokens(user);

    const accessTokenOptions = {
        expires: new Date(Date.now() + 15 * 60 * 1000), //expiration is set to 15 minutes from the current time.
        httpOnly: true,                                 //option makes the cookie inaccessible to JavaScript running on the client-side
        //secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    };

    const refreshTokenOptions = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        //secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    };

    // Send user info without sensitive data
    const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber
    };

    res.status(statusCode)
        .cookie('accessToken', accessToken, accessTokenOptions)
        .cookie('refreshToken', refreshToken, refreshTokenOptions)
        .json({
            success: true,
            user: userResponse
        });
};
