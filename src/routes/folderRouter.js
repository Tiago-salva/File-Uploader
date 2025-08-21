const { Router } = require("express");
const {
  createFolderGet,
  createFolderPost,
  getAllUserFolders,
  getSpecificFolder,
} = require("../controllers/folderController");
const folderRouter = Router();

// Get all user folders
folderRouter.get("/", getAllUserFolders);

// Get specific folder
folderRouter.get("/folder/:id", getSpecificFolder);

// Create folder
folderRouter.get("/folder/new", createFolderGet);

folderRouter.post("/folder/new", createFolderPost);

module.exports = folderRouter;
