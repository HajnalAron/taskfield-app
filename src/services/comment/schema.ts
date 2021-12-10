import sequelizeInstance from "../../db/connection";
import { DataTypes, Model } from "sequelize/dist";

interface commentInstance extends Model {
  id: number;
  text: string;
  media?: string;
  userId: number;
  taskId: number;
}

const Comment = sequelizeInstance.define<commentInstance>(
  "comment",
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
    media: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    timestamps: true
  }
);

export default Comment;
