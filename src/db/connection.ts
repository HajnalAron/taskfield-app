import { Sequelize } from "sequelize/dist";

const setMode = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return process.env.PRODUCTION_DATABASE_CONNECTION_STRING;
    case "testing":
      return process.env.TEST_DATABASE_CONNECTION_STRING;
    default:
      return process.env.DEV_DATABASE_CONNECTION_STRING;
  }
};

const DATABASE_URL = setMode();

if (!DATABASE_URL) {
  throw new Error("Missing DATABASE CONNECTION STRING");
}

const sequelizeInstance = new Sequelize(DATABASE_URL, {
  dialect: "postgres"
});

// TODO: error handling
export const connectToDB = async () => {
  try {
    await sequelizeInstance.sync({ force: true, logging: false });
    console.log("DB connection is successful");
  } catch (error) {}
};

// TODO: error handling
// export const dbTest = async () => {
//   try {
//     await sequelizeInstance.authenticate({ logging: false });
//     console.log("DB connection test is successful");
//   } catch (error) {}
// };

export default sequelizeInstance;
