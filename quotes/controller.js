import { Quote } from "./model.js";

//! Form values  from Frontend

export const addQuote = (req, res) => {
  // Extract data from the body of the request
  const {
    quote,
    category = "unassigned",
    autor = "unknown",
    favorite = false,
  } = req.body;

  // Check if at least the quotation is present
  if (!quote) {
    return res.status(400).json({ error: "Quote is necessary." });
  }

  // Create a new Quote instance with the request data
  const newQuote = new Quote({
    quote,
    category,
    autor,
    favorite,
  });

  // Save the new quote
  newQuote.save();

  // Send a successful response
  res.status(201).json({ message: "Cita agregada exitosamente." });
};

//! Fixed values example

// export const addQuote = (req, res) => {
//   const quote = new Quote({
//     quote: "Sometimes questions are more important than answers",
//     category: "philosophy",
//     autor: "Nancy Willard",
//     favorite: true,
//   });

//   quote.save();
//   res.end();
// };
