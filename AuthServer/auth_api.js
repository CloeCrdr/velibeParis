//  Ce server doit appelé les doonée présentes en base de donnée
import db from './SingleDb.js';
import express from 'express';
const app = express();
const PORT = 3003;

db.connect();

app.get('/', (req, res) => {
  let users = db.query(`SELECT * from users`, []);
  res.send('users');
});

app.get('/user', (req, res) => {
  // let user = db.query(`SELECT * from users WHERE name = "?"`,[req.body.username]);
  db.query(`SELECT * from users WHERE email = ?`, [req.body.email], (err, results) => {
    if (!results) {
      res.send("Mauvaise page héhé");
    } else {
      res.send(results[0].nom);
    }
  });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]:Serveur en cours d'exécution sur http://localhost:${PORT}`);
});