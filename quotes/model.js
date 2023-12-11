import { saveDocument } from "../utils/filestorage.js";

export const Quote = (item) => {
  return {
    quote: item.quote,
    category: item.category,
    autor: item.autor,
    favorite: item.favorite,
    collection: "quotes",
    save: function () {
      saveDocument({
        quote: this.quote,
        category: this.category,
        autor: this.autor,
        favorite: this.favorite,
        collection: this.collection,
      });
    },
  };
};

//other version

// export function Quote(item) {
//   this.quote = item.quote;
//   this.category = item.category;
//   this.autor = item.autor;
//   this.favorite = item.favorite;
//   this.collection = "quotes";
//   this.save = function () {
//     saveDocument({
//       quote: this.quote,
//       category: this.category,
//       autor: this.autor,
//       favorite: this.favorite,
//       collection: this.collection,
//     });
//   };
// }
