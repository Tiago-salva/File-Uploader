const { Router } = require("express");
const {
  createFolderGet,
  createFolderPost,
  getAllUserFolders,
} = require("../controllers/folderController");
const folderRouter = Router();

// Get all user folders
folderRouter.get("/", getAllUserFolders);

// Create folder
folderRouter.get("/folder/new", createFolderGet);

folderRouter.post("/folder/new", createFolderPost);

module.exports = folderRouter;
