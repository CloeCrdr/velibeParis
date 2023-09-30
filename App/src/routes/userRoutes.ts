import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser'; 
import bcrypt from 'bcrypt'


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/home')
.get( async (req: Request, res: Response) => {
    // const response =  await fetch('http://localhost:3003/user');
    // const users = await response.text();
    // if user connecté : retour sur render espace personnel 
    // else render login ejs
    res.render('login',{"errorMsg":""})
})
.post( async (req: Request, res: Response) => {
    // const users = await response.text();
    console.log(console.log(req.body));
    let logPass = {
        email: req.body.email,
        password : await bcrypt.hash(req.body.password, 10)
    }
    console.log(logPass)
    const response =  await fetch('http://localhost:3003/user', {
        method: 'POST',
        body: JSON.stringify(logPass),
        headers: {
            'Content-Type': 'application/json'
          }
    })
    .then((response) => response.json())
    .then(async (data) => {
        let user = data;
        let compare = await bcrypt.compare(req.body.password, user.results[0].password)
        if(compare == true){
            res.redirect('account'/*,{"users":users}*/)
        }else{
            res.render('login',{"errorMsg":data.mess})
        }
    });
    // if user connecté : retour sur render espace personnel 
    // else render login ejs
})

router.route('/login').get((req: Request, res: Response) => {
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
    // const response =  await fetch('http://localhost:3003/user');
    // const users = await response.text();
    res.render('account'/*,{"users":users}*/)
})

/*edit account */
router.route('/edit_account')
.get( async (req: Request, res: Response) => {
    const response =  await fetch('http://localhost:3003/user');
    const users = await response.text();
    res.render('edit_account',{"users":users})
})

// router.post('/register');
router.route('/register')
.get( async (req: Request, res: Response) => {
    res.render('register')
})

// router.post('/logout');
// router.post('/account')

module.exports = router