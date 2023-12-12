import { Quote } from "./model.js";
import multer from "multer";

//! Form values  from Frontend

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

// export const addQuote = (req, res) => {
//   // Extract data from the body of the request
//   const {
//     quote,
//     category = "unassigned",
//     autor = "unknown",
//     favorite = false,
//   } = req.body;

//   //   console.log("-------------🤔", req.body);

//   //   Check if at least the quotation is present
//   if (!quote) {
//     return res.status(400).json({ error: "Quote is necessary." });
//   }

//   // Create a new Quote instance with the request data
//   const newQuoteData = {
//     quote,
//     category,
//     autor,
//     favorite,
//   };

//   const newQuote = Quote(newQuoteData);

//   // Save the new quote
//   newQuote.save();

//   // Send a successful response
//   res.status(201).json({ message: "Quote successfully added" });
// };

//! Fixed values example

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
