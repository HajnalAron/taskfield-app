import sequelizeInstance from "../connection";
import { DataTypes, Model } from "sequelize/dist";

interface workspaceUserInstance extends Model {
  id: number;
  workspaceId: number;
  userId: number;
  role: "leader" | "member";
}

const WorkspaceUser = sequelizeInstance.define<workspaceUserInstance>(
  "workspaceuser",
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
      values: ["leader", "member"]
    }
  },
  {
    timestamps: true
  }
);

export default WorkspaceUser;
