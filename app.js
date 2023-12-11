import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

app.listen(process.env.PORT, () =>
  console.log("Server live in http://localhost:" + process.env.PORT)
);
