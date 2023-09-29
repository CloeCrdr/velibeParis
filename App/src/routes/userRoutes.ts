import express, { Express, Request, Response } from 'express';
import { login } from '../controllers/authController';
import bodyParser from 'body-parser'; 

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/home')
.get( async (req: Request, res: Response) => {
    // const response =  await fetch('http://localhost:3003/user');
    // const users = await response.text();
    // if user connecté : retour sur render espace personnel 
    // else render login ejs
    res.render('login.ejs'/*,{"users":users}*/)
})
.post( async (req: Request, res: Response) => {
    // const users = await response.text();
    console.log(req.body.email)
    const response =  await fetch('http://localhost:3003/user', req.body);

    // if user connecté : retour sur render espace personnel 
    // else render login ejs
    res.render('login.ejs'/*,{"users":users}*/)
})


router.route('/')
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

// router.post('/logout');
// router.post('/account')

module.exports = router