const { addFolder, getAllFolders } = require("../models/folderModel");

async function createFolderGet(req, res) {
  res.render("folder-form");
}

async function createFolderPost(req, res) {
  await addFolder(req.body.name, req.user.id);
  res.redirect("/");
}

async function getAllUserFolders(req, res) {
  const allFolders = await getAllFolders(req.user.id);
  res.render("home", { allUserFolders: allFolders });
}

module.exports = {
  createFolderGet,
  createFolderPost,
  getAllUserFolders,
};
