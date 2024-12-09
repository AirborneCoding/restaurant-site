import User from '../models/User.model.js'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../errors/index.js'
import { attachCookiesToResponse, checkPermissions, createTokenUser } from '../utils/index.js'

// get all user
const getAllUsers = async (req, res) => {
    // console.log(req.user);
    const users = await User.findAll({
        where: { role: 'user' },
        attributes: {
            exclude: ['password']
        }
    })
    res.status(StatusCodes.OK).json({ users });
};

// get single user
const getSingleUser = async (req, res) => {

    const user = await User.findOne({
        where: {
            name: req.params.name,

        },
        attributes: {
            exclude: ['password', 'passwordToken', 'passwordTokenExpirationDate']
        }
    })
    if (!user) throw new CustomError.NotFoundError(`No user with name : ${req.params.name}`);

    checkPermissions(req.user, user.id);

    res.status(StatusCodes.OK).json({ user });

}

// show user
const showCurrentUser = async (req, res) => {
    // console.log(req)
    res.status(StatusCodes.OK).json({ user: req.user });
};

// update user
const updateUser = async (req, res) => {
    const { email, name } = req.body
    if (!email || !name) {
        throw new CustomError.BadRequestError('Please provide all values');
    }

    const user = await User.findOne({
        where: {
            id: req.user.userId
        }
    });

    user.email = email;
    user.name = name;

    await user.save();

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser });
};

// TODO: update password
const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide both values');
    }
    const user = await User.findOne({
        where: {
            id: req.user.userId
        }
    });

    // if (!user) throw new CustomError.NotFoundError('User not found');

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    user.password = newPassword;

    await user.save();
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
};

export {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}