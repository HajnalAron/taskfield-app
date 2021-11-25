import sequelizeInstance from "../../db/connection";
import { DataTypes } from "sequelize/dist";

// profile pic with initials ==> https://eu.ui-avatars.com/
// active???
const User = sequelizeInstance.define(
  "user",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM,
      defaultValue: "user",
      allowNull: false,
      values: ["administrator", "support", "user"]
    }
  },
  {
    timestamps: true
  }
);

export default User;
