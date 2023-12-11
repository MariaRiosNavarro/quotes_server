import { Quote } from "./model.js";

export const addQuote = (req, res) => {
  const quote = new Quote({
    quote: "Sometimes questions are more important than answers",
    category: "philosophy",
    autor: "Nancy Willard",
    favorite: true,
  });

  quote.save();
  res.end();
};
