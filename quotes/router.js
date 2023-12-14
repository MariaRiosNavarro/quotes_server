import express from "express";
import {
  addQuote,
  deleteOneQuote,
  editOneQuote,
  getOneQuote,
} from "./controller.js";
import { getAllQuotes } from "./controller.js";
//add multer to parse forms
import multer from "multer";

const upload = multer({ dest: "../uploads" });

export const router = new express.Router();

//add multer for forms & upload rutes like, post and put
router.post("/quotes", upload.none(), addQuote);
router.put("/quotes/:id", upload.none(), editOneQuote);
//no upload
router.get("/quotes", getAllQuotes);
router.get("/quotes/:id", getOneQuote);
router.delete("/quotes/:id", deleteOneQuote);
