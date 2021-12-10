import sequelizeInstance from "../../db/connection";
import { DataTypes, Model } from "sequelize/dist";

export interface organizationInstance extends Model {
  id: number;
  name: string;
}

const Organization = sequelizeInstance.define<organizationInstance>(
  "organization",
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

export default Organization;
