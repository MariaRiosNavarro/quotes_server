import express from "express";
import { addQuote } from "./controller.js";

export const router = new express.Router();

router.post("/quotes", addQuote);
