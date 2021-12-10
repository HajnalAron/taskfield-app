import sequelizeInstance from "../../db/connection";
import { DataTypes, Model } from "sequelize/dist";

interface attachmentsInstance extends Model {
  id: number;
  link: string;
  taskId: string;
}

const Attachment = sequelizeInstance.define<attachmentsInstance>(
  "attachment",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
);

export default Attachment;
