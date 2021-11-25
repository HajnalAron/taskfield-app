import sequelizeInstance from "../../db/connection";
import { DataTypes } from "sequelize/dist";

const WorkspaceUser = sequelizeInstance.define(
  "workspaceuser",
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

export default WorkspaceUser;
