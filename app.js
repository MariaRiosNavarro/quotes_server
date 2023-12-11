import "dotenv/config";
import express from "express";
import cors from "cors";

//Router:
import { router as quoteRouter } from "./quotes/router.js";

const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use("/api", quoteRouter);

app.listen(process.env.PORT, () =>
  console.log("Server live in http://localhost:" + process.env.PORT)
);
