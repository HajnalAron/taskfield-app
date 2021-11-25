import sequelizeInstance from "../../db/connection";
import { DataTypes } from "sequelize/dist";

// TODO workspace-tasks, workspace-owner relation, category/badges e.g Marketing/Frontend
const Workspace = sequelizeInstance.define(
  "workspace",
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

export default Workspace;
