import sequelizeInstance from "../connection";
import { DataTypes } from "sequelize/dist";

const OrganizationUser = sequelizeInstance.define(
  "organizationuser",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    }
  },
  {
    timestamps: true
  }
);

export default OrganizationUser;
