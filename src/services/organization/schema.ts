import sequelizeInstance from "../../db/connection";
import { DataTypes, Model } from "sequelize/dist";

interface organizationIstance extends Model {
  id: number;
  name: string;
}

const Organization = sequelizeInstance.define<organizationIstance>(
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
