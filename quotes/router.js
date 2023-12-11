import express from "express";
import { addQuote } from "./controller.js";
//add multer to parse forms
import multer from "multer";

const upload = multer({ dest: "../uploads" });

export const router = new express.Router();

//add multer for forms
router.post("/quotes", upload.none(), addQuote);
