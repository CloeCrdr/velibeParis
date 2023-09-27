import db from './config/db.config'
import express, { Express, Request, Response } from 'express';
import login from './routes/userRoutes'
import cors from 'cors';


db.connect((err) => {
    if(err) return err
})

const app: Express = express()
const port = 3001

app.set('view engine', 'ejs')
app.use(cors());

app.use('/api/login', login)