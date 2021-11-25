import app from "./app";
import { connectToDB } from "./db/connection";
import endpoints from "express-list-endpoints";

const { PORT = 3001 } = process.env;

app.listen(PORT, async () => {
  await connectToDB();
  console.log(endpoints(app));
  console.log(`Server is lisening on port ${PORT}`);
});

app.on("error", (error) => {
  console.log(error);
});
