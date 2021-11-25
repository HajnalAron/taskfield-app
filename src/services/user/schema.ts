import sequelizeInstance from "../../db/connection";
import { DataTypes, Model } from "sequelize/dist";

interface userInstance extends Model {
  id: number;
  email: string;
  password: string;
  firstname: string;
  surname: string;
  role: "administrator" | "support" | "user";
}

// profile pic with initials ==> https://eu.ui-avatars.com/
// active???
const User = sequelizeInstance.define<userInstance>(
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

// User.beforeSave(async (user) => {
//   const hashedPassword
// });

export default User;
