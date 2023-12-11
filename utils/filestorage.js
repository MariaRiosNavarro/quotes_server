import fs from "fs/promises";
import fsystem from "fs";
import { v4 } from "uuid";

//data base folder
const DBFOLDER = "storage";

//create folder if doesnt exist
export const setup = () => {
  fs.access(`./${DBFOLDER}/`)
    .then(() => console.log("Storage Folder allready exist"))
    .catch(() => {
      fs.mkdir(`./${DBFOLDER}`);
    });
};

//save Document , f.e = /storage/quote/dgethsjsiasjhdiuwhhdw

export const saveDocument = (document) => {
  document.id = v4();
  fs.mkdir(`./${DBFOLDER}/${document.collection}`)
    .then(() => {
      fs.writeFile(
        `./${DBFOLDER}/${document.collection}/${document.id}`,
        JSON.stringify(document)
      );
    })
    .catch(() =>
      fs.writeFile(
        `./${DBFOLDER}/${document.collection}/${document.id}`,
        JSON.stringify(document)
      )
    );
};
