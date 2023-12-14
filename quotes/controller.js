import {
  getAllDocs,
  getOneDoc,
  deleteOneDoc,
  editOneDoc,
} from "../utils/filestorage.js";
import { Quote } from "./model.js";

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
    res.status(201).json({ message: "Quote successfully added ✅" });
  } catch (error) {
    // Handle errors
    console.error("Error adding quote ❌:", error);
    res.status(500).json({ error: "Internal Server Error ❌" });
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
    res.status(200).json({ message: "Quotes successfully retrieved ✅", data });
  } catch (error) {
    // Handle errors
    console.error("Error Reading all quotes ❌:", error);
    res.status(500).json({ error: "Internal Server Error ❌" });
  }
};

//!GET ONE

export const getOneQuote = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getOneDoc(id, "quotes");
    res
      .status(200)
      .json({ message: `Quote with id= ${id} sucessfully retrieved ✅`, data });
  } catch (error) {
    // Handle errors
    console.error(`Error Reading Quote with id= ${id} ❌:`, error);
    res.status(500).json({ error: "Internal Server Error ❌" });
  }
};

//!DELETE ONE

export const deleteOneQuote = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteOneDoc(id, "quotes");
    res
      .status(201)
      .json({ message: `Quote with id= ${id} sucessfully deleted ✅` });
  } catch (error) {
    // Handle errors
    console.error(`Error deleting Quote with id= ${id} ❌:`, error);
    res.status(500).json({ error: "Internal Server Error ❌" });
  }
};

//!Edit ONE

export const editOneQuote = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    console.log("-------------👻", newData);

    const data = await editOneDoc(id, "quotes", newData);
    // Send a successful response
    res
      .status(201)
      .json({ message: `Quote with id= ${id} sucessfully updated ✅`, data });
  } catch (error) {
    // Handle errors
    console.error("Error editing quote ❌:", error);
    res.status(500).json({ error: "Internal Server Error ❌" });
  }
};
