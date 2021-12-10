import supertest from "supertest";
import dotenv from "dotenv";
import app from "../app";
import sequelizeInstance from "../db/connection";

dotenv.config();

const request = supertest(app);

// describe("Testing the test environment ", () => {
//   it("should return true", () => {
//     expect(true).toBe(true);
//   });
// });

describe("Testing the user/authentication endpoints", () => {
  beforeAll(async () => {
    await sequelizeInstance.sync({ force: true, logging: false });
  });

  afterAll(async () => {
    await sequelizeInstance.close();
  });

  const testUserData = {
    email: "test@taskfield.com",
    password: "Taskfield-123",
    firstname: "Field",
    surname: "Task"
  };

  it("Testing the registration ", async () => {
    const resp = await request.post("/auth/register").send(testUserData);
    expect(resp.status).toBe(201);
  });

  it("Testing the loggin and token generation", async () => {
    const resp = await request.post("/auth/login").send(testUserData);
    expect(resp.status).toBe(200);
    console.log(resp.body);
  });
});
