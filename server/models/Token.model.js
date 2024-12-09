import { DataTypes } from 'sequelize';
import sequelize from '../db/connectDB.js';

const Token = sequelize.define('Token', {
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userAgent: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isValid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', // Referencing the 'User' model
            key: 'id',
        },
        allowNull: false,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt
});

// Define associations
Token.associate = (models) => {
    Token.belongsTo(models.User, { foreignKey: 'userId' });
};

export default Token;
