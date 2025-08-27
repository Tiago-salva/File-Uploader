const {
  addFolder,
  getFolder,
  deleteFolder,
  getHomeData,
} = require("../models/folderModel");

async function createFolderGet(req, res) {
  res.render("folder-form");
}

async function createFolderPost(req, res) {
  await addFolder(req.body.name, req.user.id);
  res.redirect("/");
}

async function getAllUserFolders(req, res) {
  if (!req.user) {
    res.render("home", { allUserFolders: [] });
  } else {
    const { folders, rootFiles } = await getHomeData(req.user.id);
    res.render("home", { folders: folders, rootFiles: rootFiles });
  }
}

async function getSpecificFolder(req, res) {
  const folderId = parseInt(req.params.id);
  const folder = await getFolder(folderId);
  res.render("folder", { folder: folder });
}

async function deleteFolderPost(req, res) {
  const folderId = parseInt(req.params.id);
  await deleteFolder(folderId);
  res.redirect("/");
}

module.exports = {
  createFolderGet,
  createFolderPost,
  getAllUserFolders,
  getSpecificFolder,
  deleteFolderPost,
};
