const express = require("express");
const multer = require("multer");
const app = express();

app.use("/public", express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
    // Array con los tipos MIME admitidos
    const allowedMimes = [
      "audio/mpeg",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png"
    ];
  
    // Verificar si el tipo MIME del archivo está en la lista de tipos permitidos
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true); // Aceptar el archivo
    } else {
      cb(new Error("Tipo de archivo no admitido"), false); // Rechazar el archivo
    }
  };
  

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // Límite de 5MB
  }
});

app.post("/upload", upload.array("files"), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("Ningún archivo fue cargado.");
  }

  const filesInfo = req.files.map(file => ({
    filename: file.filename,
    originalname: file.originalname,
    size: file.size,
    mimetype: file.mimetype,
  }));
  res.send(filesInfo);
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/index.html");
});
