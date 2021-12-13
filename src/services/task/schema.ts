import sequelizeInstance from "../../db/connection";
import { DataTypes, Model } from "sequelize/dist";

export interface taskInstance extends Model {
  id: number;
  workspaceId: number;
  name: string;
  summary: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "TO DO" | "IN PROGRESS" | "IN REVEIW" | "DONE";
  active: "open" | "closed";
  estimate: string;
  due: Date;
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
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: true
    },
    priority: {
      type: DataTypes.ENUM,
      values: ["critical", "high", "medium", "low"],
      allowNull: true
    },
    due: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estimate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM,
      defaultValue: "TO DO",
      values: ["TO DO", "IN PROGRESS", "IN REVEIW", "DONE"],
      allowNull: true
    },
    active: {
      type: DataTypes.ENUM,
      defaultValue: "open",
      values: ["open", "closed"],
      allowNull: false
    }
  },
  {
    timestamps: true
  }
);

export default Task;
