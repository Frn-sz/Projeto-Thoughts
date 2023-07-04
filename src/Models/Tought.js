const { DataTypes } = require("sequelize");

const db = require("../Database/conn");
const User = require("./User.js");

const Tought = db.define('Tought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    }
})

Tought.belongsTo(User);
User.hasMany(Tought);

module.exports = Tought