import express, { Express, Request, Response } from 'express';
import { login } from '../controllers/authController';

const router = express.Router();

router.route('/')
.get( async (req: Request, res: Response) => {
    const response =  await fetch('http://localhost:3003/user');
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

/* Route account */
router.route('/account')
.get( async (req: Request, res: Response) => {
    const response =  await fetch('http://localhost:3003/user');
    const users = await response.text();
    res.render('account',{"users":users})
})

// router.post('/register');
router.route('/register')
.get( async (req: Request, res: Response) => {
    res.render('register')
})

// router.post('/', login);
// router.post('/logout');
// router.post('/account')

module.exports = router