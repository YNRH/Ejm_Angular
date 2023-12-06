const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const musicController = require("./controllers/musicController");

const app = express();
const port = 3000;

// Configuración de middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// Conexión a la base de datos de MongoDB
mongoose
  .connect("mongodb://0.0.0.0:27017/musicaDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((error) => {
    console.log("Error al conectar a MongoDB:", error);
  });

// Multer
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Definir rutas para CRUD de música
app.get("/api/music", musicController.getMusic);
app.get("/api/music/:id", musicController.getMusicById);
app.post("/api/music", musicController.createMusic);
app.put("/api/music/:id", musicController.updateMusic);
app.delete("/api/music/:id", musicController.deleteMusic);
app.post(
  "/api/music/upload",
  upload.single("audio"),
  musicController.uploadMusic
);

// Iniciar el servidor
app.listen(port, () => {
  console.log("Servidor backend en funcionamiento en el puerto", port);
});
