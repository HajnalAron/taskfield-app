import sequelizeInstance from "../connection";
import { DataTypes, Model } from "sequelize/dist";

interface organizationUserInstance extends Model {
  id: number;
  organizaitonId: number;
  userId: number;
  role: "administrator" | "member";
}

const OrganizationUser = sequelizeInstance.define<organizationUserInstance>(
  "organizationuser",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    role: {
      type: DataTypes.ENUM,
      defaultValue: "member",
      allowNull: false,
      values: ["administrator", "member"]
    }
  },
  {
    timestamps: true
  }
);

export default OrganizationUser;
