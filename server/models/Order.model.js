// import { DataTypes } from 'sequelize';
// import sequelize from '../db/connectDB.js';
// import User from './User.model.js';

// const Order = sequelize.define('Order', {
//     userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'Users',
//             key: 'id',
//         },
//     },
//     phoneNumber: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     address: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     orderDate: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//     },
//     orderDetails: {
//         type: DataTypes.JSONB,
//         allowNull: false, // stores the ordered items, could be a list of product IDs or descriptions
//     },
//     orderState: {
//         type: DataTypes.ENUM,
//         values: ['pending', 'completed', 'canceled', 'in_progress'],
//         allowNull: false,
//         defaultValue: 'pending',
//     },
//     extraInfo: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
// });

// // Association with User (assuming User model is defined elsewhere)
// Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// export default Order;



// !---
import { DataTypes } from 'sequelize';
import sequelize from '../db/connectDB.js';
import User from './User.model.js';

const Order = sequelize.define('Order', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Allow null for guest users
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    guestUser: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    orderDetails: {
        type: DataTypes.JSONB,
        allowNull: false, // Stores items with name, price, category, amount
    },
    orderTotal: {
        type: DataTypes.FLOAT,
        allowNull: false, // Total price of the order
    },
    orderState: {
        type: DataTypes.ENUM,
        values: ['pending', 'completed', 'canceled', 'in_progress'],
        allowNull: false,
        defaultValue: 'pending',
    },
    extraInfo: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field
    },
});

Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Order;
