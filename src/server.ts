import app from "./app";
import { connectToDB } from "./db/connection";
import endpoints from "express-list-endpoints";
import { httpServer } from "./io";

const { PORT = 3001 } = process.env;

httpServer.listen(PORT, async () => {
  await connectToDB();
  // httpServer.listen(PORT);
  console.log(endpoints(app));
  console.log(`Server is lisening on port ${PORT}`);
});

app.on("error", (error) => {
  console.log(error);
});
