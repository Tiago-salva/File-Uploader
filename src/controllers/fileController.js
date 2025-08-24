const fs = require("fs");
const path = require("path");
const { getAllFolders } = require("../models/folderModel");

async function renderUploadForm(req, res) {
  const userId = parseInt(req.user.id);
  const allUserFolders = await getAllFolders(userId);
  res.render("upload-form", { allUserFolders: allUserFolders });
}

module.exports = {
  renderUploadForm,
};
