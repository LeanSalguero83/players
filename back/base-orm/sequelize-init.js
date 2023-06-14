// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + process.env.base);


const players = sequelize.define(
  "players",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "El ID es requerido",
        },
        isInt: {
          args: true,
          msg: "El ID debe ser un número entero",
        },
      },
    },
    full_name: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El correo electrónico es requerido",
        },
      },
    },
    nickname: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nickname es requerido",
        },
      },
    },
    ip_address: {
      type: DataTypes.STRING(20),
    },
    age: {
      type: DataTypes.INTEGER,
    },
    avatar: {
      type: DataTypes.STRING(50),
    },
  },
  {
    hooks: {
      beforeValidate: function (player, options) {
        if (player.full_name && typeof player.full_name === "string") {
          player.full_name = player.full_name.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);

module.exports = {
  sequelize,
  players,
};
