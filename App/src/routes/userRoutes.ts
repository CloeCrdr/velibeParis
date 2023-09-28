import express, { Express, Request, Response } from 'express';
import { login } from '../controllers/authController';

const router = express.Router();

router.route('/')
.get((req: Request, res: Response) => {
    // let test = login(req,res);
    console.log('blanla');
    res.render('login.ejs')
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