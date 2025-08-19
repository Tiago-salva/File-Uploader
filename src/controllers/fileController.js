const fs = require("fs");
const path = require("path");

async function listUploadFiles(req, res) {
  const uploadDir = path.join(__dirname, "../../uploads");

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("No se pudieron leer los archivos");
    }

    res.render("file-list", { files });
  });
}

module.exports = {
  listUploadFiles,
};
