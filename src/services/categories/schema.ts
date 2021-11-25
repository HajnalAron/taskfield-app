import sequelizeInstance from "../../db/connection";
import { DataTypes, Model } from "sequelize/dist";

interface categoryInstance extends Model {
  id: number;
  text: string;
  color: string;
}

const Category = sequelizeInstance.define<categoryInstance>(
  "category",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
);

export default Category;
