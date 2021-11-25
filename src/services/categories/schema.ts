import sequelizeInstance from "../../db/connection";
import { DataTypes } from "sequelize/dist";

const Category = sequelizeInstance.define(
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
