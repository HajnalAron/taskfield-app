import express from "express";
import cors from "cors";
import tables from "./db/relations";

console.log(tables);

const app = express();

app.use(cors());
app.use(express.json());

export default app;
