import fs from "fs/promises";
import { v4 } from "uuid";

//data base folder
const DBFOLDER = "storage";

//#create folder if doesnt exist (call the funktion at the end of this document)-

export const setup = async () => {
  try {
    // Check if the storage folder already exists
    await fs.access(`./${DBFOLDER}/`);
    console.log("Storage folder already exists.✅");
  } catch (error) {
    // Handle errors, log the error message
    console.error(
      `Error checking or creating storage folder❌: ${error.message}`
    );
    // Create the storage folder if it doesn't exist
    await fs.mkdir(`./${DBFOLDER}/`);
    console.log("Storage folder created successfully. ✅");
  }
};

//#with the same create a function to do subfolders for the collections to use in save documents

export const setupCollection = async (collection) => {
  try {
    // Check if the collection folder already exists
    await fs.access(`./${DBFOLDER}/${collection}/`);
    console.log(`${collection} folder already exists.✅`);
  } catch (error) {
    // Handle errors, log the error message
    console.error(
      `Error checking or creating ${collection} folder❌: ${error.message}`
    );
    // Create the collection folder if it doesn't exist
    await fs.mkdir(`./${DBFOLDER}/${collection}/`);
    console.log(`${collection} folder created successfully. ✅`);
  }
};

//#save Document , f.e = /storage/quote/dgethsjsiasjhdiuwhhdw

export const saveDocument = async (document) => {
  // Generate a unique ID for the document
  document.id = v4();
  try {
    // Ensure the collection folder exists, creating it if necessary (function from above)
    await setupCollection(document.collection);
    // Write the document to a file in the collection folder
    await fs.writeFile(
      `./${DBFOLDER}/${document.collection}/${document.id}`,
      JSON.stringify(document)
    );
    console.log(
      `Document saved successfully with ID ${document.id} to collection ${document.collection}✅.`
    );
  } catch (error) {
    // Handle errors, log the error message
    console.error(
      `Error saving document with ID ${document.id} to collection ${document.collection}❌: ${error.message}`
    );
  }
};

//# READ ALL DOKUMENTS from one Collection, retrieves all documents from a specified collection

export const getAllDocs = async (collection) => {
  try {
    // Initialize an array to store the retrieved documents
    const docsArray = [];

    // Get a list of all files in the specified collection folder
    const files = await fs.readdir(`./${DBFOLDER}/${collection}`);

    // Iterate through each file and read its content
    for (const file of files) {
      const stringDoc = await fs.readFile(
        `./${DBFOLDER}/${collection}/${file}`
      );

      // Parse the content as JSON and push the document to the array
      docsArray.push(JSON.parse(stringDoc));
    }

    // Return the array containing all documents
    return docsArray;
  } catch (error) {
    // Handle errors, log the error message
    console.error(
      `Error retrieving documents from collection ${collection}❌:`,
      error.message
    );
  }
};

//#READ ONE DOKUMENT from one Collection

export const getOneDoc = async (id, collection) => {
  try {
    // Read the content of the document file
    const data = await fs.readFile(`./${DBFOLDER}/${collection}/${id}`);

    // Parse the content as JSON and return the document as an object
    return JSON.parse(data.toString());
  } catch (error) {
    // Handle errors, log the error message
    console.error(
      `Error retrieving document with ID ${id} from collection ${collection}❌:`,
      error.message
    );
  }
};

//#DELETE ONE DOCUMENT from one Collection

export const deleteOneDoc = async (id, collection) => {
  try {
    // Get the document to be deleted
    const oneDoc = await getOneDoc(id, collection);

    // Check if the document has an image propierty as img, and delete it if present
    if (oneDoc.img) {
      await fs.rm(oneDoc.img);
    }

    // Delete the document file from the specified collection folder
    await fs.rm(`./${DBFOLDER}/${collection}/${id}`);

    console.log(
      `Document with ID ${id} successfully deleted from collection ${collection}✅.`
    );
  } catch (error) {
    console.error(
      `Error deleting document with ID ${id} from collection ${collection}❌:`,
      error.message
    );
  }
};

// #UPDATE ONE DOCUMENT

export const editOneDoc = async (id, collection, newData) => {
  try {
    let oneDoc = await getOneDoc(id, collection);
    // Update the document with new data
    oneDoc = { ...oneDoc, ...newData };
    // Write the updated document back to the file
    await fs.writeFile(
      `./${DBFOLDER}/${collection}/${id}`,
      JSON.stringify(oneDoc)
    );
    console.log(
      `Document with ID ${id} successfully edited in collection ${collection} ✅.`
    );
  } catch (error) {
    // Handle errors, log the error message
    console.error(
      `Error editing document with ID ${id} in collection ${collection}❌: ${error.message}`
    );
  }
};
// read line 16

setup();
