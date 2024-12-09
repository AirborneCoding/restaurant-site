import { DataTypes } from 'sequelize';
import sequelize from '../db/connectDB.js';

const Event = sequelize.define('Event', {
    eventName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    eventDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    eventDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    eventType: {
        type: DataTypes.STRING,
        allowNull: false,
        // Example: 'Live Music', 'Food Festival'
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {
            url: "",
            id: null,
        },
    },
});

export default Event;
