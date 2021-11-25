import supertest from "supertest";
import dotenv from "dotenv";
import app from "../app";
import sequelizeInstance, { connectToDB } from "../db/connection";

dotenv.config();

const request = supertest(app);

// describe("Testing the test environment ", () => {
//   it("should return true", () => {
//     expect(true).toBe(true);
//   });
// });

describe("Testing the user endpoints", () => {
  beforeAll((done) => {
    sequelizeInstance.sync({ force: true, logging: false }).then(() => {
      done();
    });
  });

  it("should return true", () => {
    expect(true).toBe(true);
  });

  afterAll((done) => {
    sequelizeInstance.drop({ cascade: true }).then(() => {
      sequelizeInstance.close().then(() => {
        done();
      });
    });
  });
});
