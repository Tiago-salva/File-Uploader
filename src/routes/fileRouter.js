const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Router } = require("express");
const upload = require("../../config/multer-config");
const { renderUploadForm } = require("../controllers/fileController");
const fileRouter = Router();

fileRouter.get("/", renderUploadForm);

fileRouter.post("/", upload.single("myFile"), async (req, res) => {
  try {
    let targetFolderId = parseInt(req.body.folderId);
    // If there is no folder selected use root folder
    if (!targetFolderId) {
      const userId = req.user.id;
      const rootFolder = await prisma.folder.findFirst({
        where: { userId: userId, name: "Root" },
      });
      targetFolderId = rootFolder.id;
    }

    const file = await prisma.file.create({
      data: {
        name: req.file.originalname,
        size: req.file.size,
        url: req.file.path,
        folderId: targetFolderId,
      },
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error subiendo archivo" });
  }
});

module.exports = fileRouter;
