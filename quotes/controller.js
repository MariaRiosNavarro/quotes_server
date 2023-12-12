import { getAllDocs } from "../utils/filestorage.js";
import { Quote } from "./model.js";
import multer from "multer";

//! ADD Form values  from Frontend

export const addQuote = async (req, res) => {
  try {
    // Extract data from the body of the request
    const {
      quote,
      category = "unassigned",
      autor = "unknown",
      favorite = false,
    } = req.body;

    //   console.log("-------------🤔", req.body);

    //   Check if at least the quote.quote is present
    if (!quote) {
      return res.status(400).json({ error: "Quote is necessary." });
    }

    // Create a new Quote with the data
    const newQuoteData = {
      quote,
      category,
      autor,
      favorite,
    };

    const newQuote = Quote(newQuoteData);

    // Save the new quote
    await newQuote.save();

    // Send a successful response
    res.status(201).json({ message: "Quote successfully added" });
  } catch (error) {
    // Handle errors
    console.error("Error adding quote:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Fixed values example

// export const addQuote = (req, res) => {
//   const newQuoteData = {
//     quote: "quote txt",
//     category: "category",
//     autor: "author name",
//     favorite: true,
//   };

//   const newQuote = Quote(newQuoteData);
//   newQuote.save();
// };

//! GET ALL

export const getAllQuotes = async (req, res) => {
  try {
    const data = await getAllDocs("quotes");
    res.status(201).json({ message: "Quotes successfully retrieved", data });
  } catch (error) {
    // Handle errors
    console.error("Error Reading all quotes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
