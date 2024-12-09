import { DataTypes } from 'sequelize';
import sequelize from '../db/connectDB.js';
import User from './User.model.js';

const Reservation = sequelize.define('Reservation', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    reservationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    tableNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    eventType: {
        type: DataTypes.STRING,
        allowNull: true,
        // Example: 'Birthday Party', 'Business Meeting'
    },
    numberOfPeople: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reservationState: {
        type: DataTypes.ENUM,
        values: ['confirmed', 'pending', 'canceled'],
        allowNull: false,
        defaultValue: 'pending',
    },
    specialRequests: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

Reservation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Reservation;
