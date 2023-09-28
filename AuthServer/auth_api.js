//  Ce server doit appelé les doonée présentes en base de donnée
const express = require('express');
const app = express();

const PORT = 3002;

app.get('/', (req, res) => {
  res.send('Get all user');
});

app.get('/user', (req, res) => {
    res.send('Va chercher le user John DOE en DB');
  });

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});