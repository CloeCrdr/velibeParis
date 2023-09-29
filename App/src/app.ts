// import db from './config/db.config'
import express, { Express, Request, Response } from 'express';
import path from "path";
import cors from 'cors';

const routes = require('./routes/userRoutes')

const app: Express = express();
const port = 3000;

app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname+'/assets'));
app.use(express.urlencoded({ extended: false }))


app.use("/",routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
