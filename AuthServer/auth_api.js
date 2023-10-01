//  Ce server doit appelé les doonée présentes en base de donnée
import 'dotenv/config';
import db from './SingleDb.js';
import express from 'express';
import bodyParser from 'body-parser';  
import jwt from 'jsonwebtoken'

const app = express();
const PORT = 3003;

db.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.raw());

app.get('/', (req, res) => {
  let users = db.query(`SELECT * from users`, []);
  res.send('users');
});

app.post('/login', (req, res) => {
  // let user = db.query(`SELECT * from users WHERE name = "?"`,[req.body.username]);
  db.query(`SELECT * from users WHERE email = ? `, [req.body.email], (err, results) => {
    console.log(results);
    if (results.length === 0 ) {
      res.status(400).json({mess:"Email incorrect"});
    } else {
      let token = jwt.sign({ ...results }, 'ma cle');
      res.status(200);
      res.send({ token,results })
    }
  });
});

app.post('/register', (req, res) => {
  // let user = db.query(`SELECT * from users WHERE name = "?"`,[req.body.username]);
  db.query(`INSERT INTO users (nom,prenom,email,password) VALUES (?,?,?,?) `, [req.body.nom,req.body.prenom,req.body.email,req.body.password], (err, results) => {
    if(results && results.insertId > 0){
      res.status(201).json({mess:"Register success",status:true})
    }else{
      res.status(500).json({mess:"Register failed",status:false})
    }

    err ? console.log(err):'';
  });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]:Serveur en cours d'exécution sur http://localhost:${PORT}`);
});