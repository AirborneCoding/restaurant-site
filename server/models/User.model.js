import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../db/connectDB.js';

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [3, 50],
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Please provide a valid email address',
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     len: [6, Infinity],
        // },
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isIn: [['admin', 'user']], // Enforcing enum for roles
        },
    },
    verificationToken: {
        type: DataTypes.STRING,
    },
    // isVerified: {
    //     type: DataTypes.BOOLEAN,
    //     defaultValue: false,
    // },
    // verified: {
    //     type: DataTypes.DATE,
    // },
    passwordToken: {
        type: DataTypes.STRING,
    },
    passwordTokenExpirationDate: {
        type: DataTypes.DATE,
    },
}, {});

// Hash password before saving the user to the database
User.beforeSave(async (user) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

// Method to compare passwords
User.prototype.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

export default User;
