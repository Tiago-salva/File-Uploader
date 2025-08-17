const { Router } = require("express");
const upload = require("../../config/multer-config");
const fileRouter = Router();

fileRouter.get("/", (req, res) => res.render("upload-form"));

fileRouter.post("/", upload.single("myFile"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.send("Archivo subido correctamente");
});

module.exports = fileRouter;
