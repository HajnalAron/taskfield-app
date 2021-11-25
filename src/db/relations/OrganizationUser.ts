import sequelizeInstance from "../../db/connection";
import { DataTypes } from "sequelize/dist";

const OrganizationUser = sequelizeInstance.define(
  "organizationuser",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
);

export default OrganizationUser;
