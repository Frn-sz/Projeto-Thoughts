const { DataTypes } = require("sequelize");

const db = require("../database/conn");
const User = require("./User");

const Thought = db.define('Thought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Thought.belongsTo(User);

User.hasMany(Thought);

module.exports = Thought