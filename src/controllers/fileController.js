const getFile = require("../models/fileModel");
const { getAllFolders } = require("../models/folderModel");

async function renderUploadForm(req, res) {
  const userId = parseInt(req.user.id);
  const allFolders = await getAllFolders(userId);
  res.render("upload-form", { allFolders: allFolders });
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function formatDate(date) {
  return new Date(date).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function renderFileDetail(req, res) {
  const fileId = parseInt(req.params.id);
  const file = await getFile(fileId);
  const formattedFile = {
    ...file,
    formattedSize: formatFileSize(file.size),
    formattedDate: formatDate(file.uploadedAt),
  };
  console.log(formattedFile);
  res.render("file-detail", { file: formattedFile });
}

module.exports = {
  renderUploadForm,
  renderFileDetail,
};
