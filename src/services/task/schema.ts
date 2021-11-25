import sequelizeInstance from "../../db/connection";
import { DataTypes, Model } from "sequelize/dist";

interface taskInstance extends Model {
  id: number;
  name: string;
}

const Task = sequelizeInstance.define<taskInstance>(
  "task",
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

export default Task;
