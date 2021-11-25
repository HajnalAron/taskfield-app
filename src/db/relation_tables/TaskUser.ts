import sequelizeInstance from "../connection";
import { DataTypes } from "sequelize/dist";

const TaskUser = sequelizeInstance.define(
  "taskuser",
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

export default TaskUser;
