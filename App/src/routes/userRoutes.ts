import express, { Express, Request, Response } from 'express';
import { login } from '../controllers/authController';

const router = express.Router();

router.route('/')
.get( async (req: Request, res: Response) => {
    const response =  await fetch('http://localhost:3002/user');
    const users = await response.text();
    res.render('login.ejs',{"users":users})
})

router.route('/home')
.get((req: Request, res: Response) => {
    router.route('/api/auth/').get((request: Request, response: Response) => {
        response.end()
    })
    res.render('index')
})

// router.post('/', login);
// router.post('/register');
// router.post('/logout');
// router.post('/account')

module.exports = router