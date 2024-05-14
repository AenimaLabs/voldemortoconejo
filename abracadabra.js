const express = require('express');
const app = express();
const port = 3000;

app.get('/azar/:numero', (req, res) => {
  // Extraer el parámetro "numero" de la URL de la solicitud
  const numeroSolicitado = parseInt(req.params.numero);

  // Validar el número solicitado (opcional para mayor robustez)
  if (isNaN(numeroSolicitado) || numeroSolicitado < 1 || numeroSolicitado > 3) {
    return res.status(400).send('Número no válido. Especifique un número entre 1 y 3.');
  }

  // Generar un número aleatorio entre 1 y 3
  const numeroAleatorio = Math.floor(Math.random() * 3) + 1;

  // Crear la respuesta en base a los números solicitado y aleatorio
  let respuesta;
  if (numeroSolicitado === numeroAleatorio) {
    respuesta = `¡Felicidades! El número aleatorio es ${numeroAleatorio}, igual al que solicitaste (${numeroSolicitado}).`;
  } else {
    respuesta = `El número aleatorio es ${numeroAleatorio}. El número que solicitaste es ${numeroSolicitado}.`;
  }

  res.send(respuesta);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
