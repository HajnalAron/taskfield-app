import sequelizeInstance from "../connection";
import { DataTypes, Model } from "sequelize/dist";

interface taskUserInstance extends Model {
  id: number;
  taskId: number;
  userId: number;
}

const TaskUser = sequelizeInstance.define<taskUserInstance>(
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
