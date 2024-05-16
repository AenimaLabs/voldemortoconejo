const express = require("express");
const app = express();

const fs = require("fs");



// Middleware para verificar si el usuario existe
const verificarUsuario = (req, res, next) => {
  const usuario = req.params.usuario;
  // Lee el archivo data.json
  fs.readFile(__dirname + "/data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo data.json:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    // Parsea el contenido del archivo JSON
    const usuarios = JSON.parse(data).usuarios;
    // Verifica si el usuario está en la lista de usuarios
    if (usuarios.includes(usuario)) {
      next(); // Continúa con la siguiente función en la ruta
    } else {
      // res.status(404).json({ error: "Usuario no encontrado" });
      res.sendFile(`${__dirname}/assets/who.jpeg`);
    }
  });
};

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});

app.use(express.static("assets"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Ruta que devuelve el archivo JSON de usuarios
app.get("/abracadabra/usuarios", (req, res) => {
  fs.readFile(__dirname + "/data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo data.json:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    // Parsea el contenido del archivo JSON
    const usuarios = JSON.parse(data).usuarios;
    res.json({ usuarios });
  });
});

// Ruta que utiliza el middleware para verificar el usuario
app.get("/abracadabra/juego/:usuario", verificarUsuario, (req, res) => {
  res.json({ mensaje: `Bienvenido al juego, ${req.params.usuario}!` });
});

// Ruta para mostrar la imagen de Conejo o Voldemort
app.get("/abracadabra/conejo/:n", (req, res) => {
  const n = parseInt(req.params.n);
  const n2 = Math.floor(Math.random() * (4 - 1)) + 1;

  if (n === n2) {
    res.sendFile(`${__dirname}/assets/conejito.jpg`);
  } else {
    res.sendFile(`${__dirname}/assets/voldemort.jpg`);
  }
  console.log(`el número aleatorio es: ${n2} y el elegido fue ${n}`);
});

// Middleware para manejar rutas no definidas
app.use((req, res) => {
  res.status(404).send("Esta página no existe");
});


// // Paso 1
// app.get("/azar/:numero", (req, res) => {
//     // Paso 2
//     const n = Math.floor(Math.random() * (4-1)) + 1;

//     // Paso 3
//     const numero = req.params.numero;

//     // Paso 3
//     numero == n
//     ? res.send("Hoy estás de suerte ;)")
//     : res.send("Buena suerte para la próxima...");});
