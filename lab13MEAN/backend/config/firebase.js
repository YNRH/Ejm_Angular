
// Importa solo las funciones necesarias de los SDK de Firebase
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDEykKG1U6YRrXnobrhU_yY4ukCNWR4c7I",
  authDomain: "audio-5de40.firebaseapp.com",
  projectId: "audio-5de40",
  storageBucket: "audio-5de40.appspot.com",
  messagingSenderId: "548820489572",
  appId: "1:548820489572:web:fb6057552aacd19d49d671",
  measurementId: "G-EY4HG61LZH"
};

// Inicializa la aplicación de Firebase sin Analytics
const app = initializeApp(firebaseConfig);

// Obtiene la instancia de storage
const storage = getStorage(app);

// Exporta el objeto de almacenamiento
module.exports = storage;
