import fs from "fs/promises";
import fsystem from "fs";
import { v4 } from "uuid";

//data base folder
const DBFOLDER = "storage";

//create folder if doesnt exist (call the funktion at the end of this document)-try/c

export const setup = async () => {
  try {
    await fs.access(`./${DBFOLDER}/`);
    console.log("Storage Folder allready exist");
  } catch (error) {
    console.log(error.message);
  }
};

//save Document , f.e = /storage/quote/dgethsjsiasjhdiuwhhdw

export const saveDocument = async (document) => {
  document.id = v4();
  try {
    const collectionFolder = await fs.mkdir(
      `./${DBFOLDER}/${document.collection}`
    );
    fs.writeFile(
      `./${DBFOLDER}/${document.collection}/${document.id}`,
      JSON.stringify(document)
    );
  } catch (error) {
    fs.writeFile(
      `./${DBFOLDER}/${document.collection}/${document.id}`,
      JSON.stringify(document)
    );
    console.log(error.message);
  }
};

// READ ALL DOKUMENTS from one Collection

export const getAllDocs = async (collection) => {
  try {
    const docsArray = [];
    const files = await fs.readdir(`./${DBFOLDER}/${collection}`);
    for (const file of files) {
      const stringDoc = await fs.readFile(
        `./${DBFOLDER}/${collection}/${file}`
      );
      docsArray.push(JSON.parse(stringDoc));
    }
    return docsArray;
  } catch (error) {
    console.log(error.message);
  }
};

// read line 16

setup();
