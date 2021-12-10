import sequelizeInstance from "../../db/connection";
import { DataTypes, Model } from "sequelize/dist";

export interface workspaceIstance extends Model {
  id: number;
  name: string;
  organizationId: number;
}

// TODO workspace-tasks, workspace-owner relation, category/badges e.g Marketing/Frontend
const Workspace = sequelizeInstance.define<workspaceIstance>(
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
