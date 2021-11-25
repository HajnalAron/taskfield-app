import sequelizeInstance from "../../db/connection";
import { DataTypes, Model, where } from "sequelize/dist";
import bcrypt from "bcrypt";
import { loginData } from "../../../types/loginData";

interface userInstance extends Model {
  id: number;
  email: string;
  password: string;
  firstname: string;
  surname: string;
  avatar: string;
  role: "administrator" | "support" | "user";
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
      allowNull: false
    }
  },
  {
    timestamps: true
  }
);

User.beforeCreate((user) => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  user.avatar = `https://eu.ui-avatars.com/?name=${user.surname}+${user.firstname}&background=${color}&rounded=true`;
});

User.beforeSave(async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

User.prototype.checkValidity = async function async(
  loginData: loginData
): Promise<boolean> {
  const { email, password } = loginData;
  const targetUser = await User.findOne({
    where: {
      email: email
    }
  });
  if (targetUser) {
    const isUserCredentialsValid = await bcrypt.compare(
      targetUser.password,
      password
    );
    if (isUserCredentialsValid) {
      return true;
    } else return false;
  } else return false;
};

User.prototype.toJSON = function (): any {
  let user = Object.assign({}, this.get());
  delete user.password;
  delete user.refreshToken;
  return user;
};

export default User;
