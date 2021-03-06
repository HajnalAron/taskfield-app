import sequelizeInstance from "../../db/connection";
import { DataTypes, Model } from "sequelize/dist";

export interface workspaceIstance extends Model {
  id: number;
  name: string;
  organizationId: number;
  logo: string;
}

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
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    timestamps: true
  }
);

export default Workspace;
