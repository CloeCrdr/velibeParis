//  Ce server doit appelé les doonée présentes en base de donnée
import db from './SingleDb.js';
import express from 'express';
const app = express();
const PORT = 3003;
import bodyParser from 'body-parser';  

db.connect();
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  let users = db.query(`SELECT * from users`, []);
  res.send('users');
});

app.post('/user', (req, res) => {
  console.log("HERE", req)
  // let user = db.query(`SELECT * from users WHERE name = "?"`,[req.body.username]);
  db.query(`SELECT * from users WHERE email = ? AND password = ?`, [req.body.email, req.body.password], (err, results) => {
    if (!results) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]:Serveur en cours d'exécution sur http://localhost:${PORT}`);
});