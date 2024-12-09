import User from '../models/User.model.js'
import Token from '../models/Token.model.js'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../errors/index.js'
import {
    attachCookiesToResponse,
    createTokenUser,
    createHash,
    sendVerificationEmail,
    sendResetPasswordEmail,

} from '../utils/index.js'
import crypto from 'crypto'


// register
const register = async (req, res) => {
    const { email, name, password } = req.body;

    const emailAlreadyExists = await User.findOne({
        where: { email: email }
    });

    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists');
    }

    // first registered user is an admin
    const isFirstAccount = (await User.count()) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const verificationToken = crypto.randomBytes(40).toString('hex');

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken,
    });

    const origin = 'http://localhost:3000';

    // await sendVerificationEmail({
    //     name: user.name,
    //     email: user.email,
    //     verificationToken: user.verificationToken,
    //     origin,
    // });
    // send verification token back only while testing in postman!!!
    res.status(StatusCodes.CREATED).json({
        msg: 'Success! Please check your email to verify account',
    });
};

// verify email
// const verifyEmail = async (req, res) => {
//     const { verificationToken, email } = req.body;
//     const user = await User.findOne({
//         where: { email: email }
//     });

//     if (!user) {
//         throw new CustomError.UnauthenticatedError('Verification Failed');
//     }

//     if (user.verificationToken !== verificationToken) {
//         throw new CustomError.UnauthenticatedError('Verification Failed');
//     }

//     (user.isVerified = true), (user.verified = Date.now());
//     user.verificationToken = '';

//     await user.save();

//     res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
// };

// login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({
        where: { email: email }
    });

    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    // todo
    // if (!user.isVerified) {
    //     throw new CustomError.UnauthenticatedError('Please verify your email');
    // }

    const tokenUser = createTokenUser(user);

    // create refresh token
    let refreshToken = '';

    // check for existing token
    const existingToken = await Token.findOne({
        where: { userId: user.id },
    });

    if (existingToken) {
        const { isValid } = existingToken;
        if (!isValid) {
            throw new CustomError.UnauthenticatedError('Invalid Credentials');
        }
        refreshToken = existingToken.refreshToken;
        attachCookiesToResponse({ res, user: tokenUser, refreshToken });
        return res.status(StatusCodes.OK).json({ user: tokenUser });
    }

    refreshToken = crypto.randomBytes(40).toString('hex');
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;
    const userToken = { refreshToken, ip, userAgent, userId: user.id };

    await Token.create(userToken);

    attachCookiesToResponse({ res, user: tokenUser, refreshToken });

    res.status(StatusCodes.OK).json({ user: tokenUser });
};

// logout
const logout = async (req, res) => {
    // Delete the refresh token from the Token model
    await Token.destroy({
        where: {
            userId: req.user.userId,
        }
    });

    // Clear cookies
    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
        // secure: process.env.NODE_ENV === 'production', // Only secure in production
        sameSite: 'lax', // Allows cross-origin requests
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie('refreshToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: 'lax', // Allows cross-origin requests
    });

    res.status(StatusCodes.OK).json({ msg: 'User logged out!' });
};

// forgot password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new CustomError.BadRequestError('Please provide valid email');
    }

    const user = await User.findOne({
        where: { email: email }
    });

    if (user) {
        const passwordToken = crypto.randomBytes(70).toString('hex');
        // send email
        const origin = 'http://localhost:3000';
        await sendResetPasswordEmail({
            name: user.name,
            email: user.email,
            token: passwordToken,
            origin,
        });

        const tenMinutes = 1000 * 60 * 10;
        const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

        user.passwordToken = createHash(passwordToken);
        user.passwordTokenExpirationDate = passwordTokenExpirationDate;
        await user.save();
    }

    res
        .status(StatusCodes.OK)
        .json({ msg: 'Please check your email for reset password link' });
};

// reset password
const resetPassword = async (req, res) => {
    const { token, email, password } = req.body;
    if (!token || !email || !password) {
        throw new CustomError.BadRequestError('Please provide all values');
    }

    const user = await User.findOne({
        where: { email: email }
    });

    if (user) {
        const currentDate = new Date();

        if (
            user.passwordToken === createHash(token) &&
            user.passwordTokenExpirationDate > currentDate
        ) {
            user.password = password;
            user.passwordToken = null;
            user.passwordTokenExpirationDate = null;
            await user.save();
        }
    }

    res.send('reset password');
};


const deleteUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.destroy({
        where: { id: id }
    });

    if (!user) {
        return res.send("not found")
    }

    res.send({ masg: "success", user })
}

export {
    register,
    login,
    // verifyEmail,
    logout,
    forgotPassword,
    resetPassword,
    deleteUser,
}