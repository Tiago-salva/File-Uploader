const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Router } = require("express");
const upload = require("../../config/multer-config");
const fileRouter = Router();

fileRouter.get("/", (req, res) => res.render("upload-form"));

fileRouter.post("/", upload.single("myFile"), async (req, res) => {
  try {
    await prisma.folder.create({
      data: {
        name: "main",
        userId: 6,
      },
    });
    // const { folderId } = req.body;

    // Cloudinary devuelve URL en req.file.path
    const file = await prisma.file.create({
      data: {
        name: req.file.originalname,
        size: req.file.size,
        url: req.file.path, // <- el URL en la nube
        folderId: 1,
      },
    });
    console.log(req.file);
    res.json(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error subiendo archivo" });
  }
});

module.exports = fileRouter;
