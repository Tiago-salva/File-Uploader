const { Router } = require("express");
const {
  createFolderGet,
  createFolderPost,
  getAllUserFolders,
  getSpecificFolder,
  deleteFolderPost,
} = require("../controllers/folderController");
const { isAuthenticated } = require("../middleware/authMiddleware");
const folderRouter = Router();

// Get all user folders
folderRouter.get("/", isAuthenticated, getAllUserFolders);

// Create folder
folderRouter.get("/folder/new", isAuthenticated, createFolderGet);

folderRouter.post("/folder/new", isAuthenticated, createFolderPost);

// Delete folder
folderRouter.post("/folder/:id/delete", deleteFolderPost);

// Get specific folder
folderRouter.get("/folder/:id", isAuthenticated, getSpecificFolder);

module.exports = folderRouter;
