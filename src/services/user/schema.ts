import sequelizeInstance from "../../db/connection";
import { DataTypes, Model, where } from "sequelize/dist";
import bcrypt from "bcrypt";

export interface userInstance extends Model {
  id: number;
  email: string;
  password: string;
  firstname: string;
  surname: string;
  avatar: string;
  role: "administrator" | "support" | "user";
  checkValidity: (password: string) => Promise<boolean>;
}

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
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    timestamps: true
  }
);

User.beforeCreate((user) => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  user.avatar = `https://eu.ui-avatars.com/api/?name=${user.surname}+${user.firstname}&background=${color}&rounded=true`;
});

User.beforeSave(async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

User.prototype;

User.prototype.checkValidity = async function (
  password: string
): Promise<boolean> {
  const isValid = await bcrypt.compare(password, this.dataValues.password);
  if (isValid) {
    return true;
  } else return false;
};

User.prototype.toJSON = function ({}): any {
  let user = Object.assign({}, this.get());

  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;

  return user;
};

export default User;
