// musicController.js
const { ref, uploadBytesResumable, getDownloadURL, deleteObject } = require('firebase/storage');
const Music = require('../models/music');
const storage = require('../config/firebase');

exports.getMusic = (req, res) => {
  Music.find()
    .then((music) => res.json(music))
    .catch((error) => res.status(500).json({ error: error.message }));
};

exports.getMusicById = (req, res) => {
  Music.findById(req.params.id)
    .then((song) => {
      if (!song) {
        return res.status(404).json({ message: 'Canción no encontrada' });
      }
      res.json(song);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

// Crear un nuevo elemento
exports.createMusic = (req, res) => {
  const newMusic = new Music({
    title: req.body.title,
    artist: req.body.artist,
    genre: req.body.genre,
    // Otros campos que desees para tu modelo
  });
  newMusic
    .save()
    .then((music) => {
      res.status(201).json(music);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};


exports.updateMusic = (req, res) => {
  Music.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((song) => {
      if (!song) {
        return res.status(404).json({ message: 'Canción no encontrada' });
      }
      res.json(song);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

exports.deleteMusic = async (req, res) => {
  try {
    const deletedSong = await Music.findByIdAndDelete(req.params.id);

    if (!deletedSong) {
      return res.status(404).json({ message: 'Canción no encontrada' });
    }

    // Obtener la URL del archivo almacenado antes de eliminarlo de la base de datos
    const audioPath = deletedSong.audioPath;

    // Eliminar la canción de la base de datos MongoDB
    res.json({ message: 'Canción eliminada correctamente' });

    // Eliminar el archivo de Firebase Storage utilizando la URL recuperada
    const storageRef = ref(storage, audioPath); // Asegúrate de que la ruta sea correcta según cómo está almacenada en Firebase
    await deleteObject(storageRef);
    console.log('Archivo eliminado de Firebase Storage');
  } catch (error) {
    console.error('Error al eliminar la canción o el archivo:', error);
    res.status(500).json({ error: 'Error al eliminar la canción o el archivo' });
  }
};


exports.uploadMusic = async (req, res) => {
  try {
    if (!req.file || !req.body.title || !req.body.artist || !req.body.genre) {
      return res.status(400).json({ error: 'Title, artist, genre, and file are required fields.' });
    }

    const storageRef = ref(storage, 'audio/' + req.file.originalname);
    const fileSnapshot = await uploadBytesResumable(storageRef, req.file.buffer);
    const downloadURL = await getDownloadURL(fileSnapshot.ref);

    const { title, artist, genre } = req.body;

    const newMusic = new Music({
      title,
      artist,
      genre,
      audioPath: downloadURL,
    });

    // Verificar si el archivo se subió correctamente antes de guardar la información en la base de datos
    const savedMusic = await newMusic.save();
    res.status(201).json(savedMusic);
  } catch (error) {
    console.error('Error al subir el archivo o guardar en la base de datos:', error);
    res.status(500).json({ error: 'Error al subir el archivo o guardar en la base de datos' });
  }
};
