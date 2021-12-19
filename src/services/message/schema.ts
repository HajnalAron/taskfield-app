import sequelizeInstance from "../../db/connection";
import { DataTypes, Model } from "sequelize/dist";

interface messageInstance extends Model {
  id: number;
  text: string;
  userId: number;
  workspaceId: number;
}

const Message = sequelizeInstance.define<messageInstance>(
  "message",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
);

export default Message;
