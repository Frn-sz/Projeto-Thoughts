const { DataTypes } = require("sequelize");

const db = require("../database/conn");

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    }
})

module.exports = User;