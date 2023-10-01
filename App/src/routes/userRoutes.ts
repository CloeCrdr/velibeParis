import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser'; 
import bcrypt from 'bcrypt'
import jwt, { VerifyOptions } from 'jsonwebtoken'


const router = express.Router();
const jwtSecret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIwIjp7ImlkIjoxLCJub20iOiJEb2UiLCJwcmVub20iOiJKb2huIiwiZW1haWwiOiJqb2huQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEpGWUJHSW9obDdsc000SkIyZnhONHV2Vy9zcXFsZkxBaTJ1NFVLaUR2UFUubHZZQWRQS0llIn0sImlhdCI6MTY5NjE1MDcxOX0.KQ0XyJB8w4WrQkvyKkjOPt6PCJRJRl09NC2w6UYMadw'

router.use(bodyParser.urlencoded({ extended: true }));

router.route('/home')
.get( async (req: Request, res: Response) => {
    // const response =  await fetch('http://localhost:3003/user');
    // const users = await response.text();
    // if user connecté : retour sur render espace personnel 
    // else render login ejs
    res.render('user_space.ejs'/*,{"users":users}*/)
})
.post( async (req: Request, res: Response) => {
    let logPass = {
        email: req.body.email,
        password : await bcrypt.hash(req.body.password, 10)
    }
    const response =  await fetch('http://localhost:3003/login', {
        method: 'POST',
        body: JSON.stringify(logPass),
        headers: {
            'Content-Type': 'application/json'
          }
    })
    .then((response) => response.json())
    .then(async (data) => {
        let user = data;
        if(user.results){
            let compare = await bcrypt.compare(req.body.password, user.results[0].password)
            console.log(compare);
            if(compare == true){
                res.cookie("jwt", user.token, {
                    httpOnly: true,
                    maxAge: (3*60*60) * 1000, // 3hrs in ms
                  });
                console.log(user)
                res.redirect('account'/*,{"users":users}*/)
            }else{
                res.render('login',{"errorMsg":"Email ou mot de passe incorrect"})
            }
        }else{
            res.render('login',{"errorMsg":"Email ou mot de passe incorrect"})
        }
    });
    // if user connecté : retour sur render espace personnel 
    // else render login ejs
})

// router.post('/register');
router.route('/register')
.get( async (req: Request, res: Response) => {
    res.render('register')
})
.post( async (req: Request, res: Response) => {
    // const users = await response.text();
   console.log(req.body);
   let registerDatas = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password : await bcrypt.hash(req.body.password, 10)
    }
    if(req.body.password == req.body.confirmpass){
        const response =  await fetch('http://localhost:3003/register', {
            method: 'POST',
            body: JSON.stringify(registerDatas),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then(async (data) => {
            console.log(data)
            if(data.status == true){
                res.redirect("login");
            }
        })
    }else{
        res.render("register",{"errorMsg":"Erreur d'inscription"})
    }
   
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
    if(req.cookies.jwt){
        jwt.verify(req.cookies.jwt, jwtSecret, (err:any, decodedToken:any) => {
            if (err) {
              return res.render('login',{"errorMsg":"Accès non autorisé veuillez vous authentifier!"})
            }else{
                res.render('account'/*,{"users":users}*/)
            }
        })
    }else{
        res.render('login',{"errorMsg":"Accès non autorisé veuillez vous authentifier!"})
    }
})

/*edit account */
router.route('/edit_account')
.get( async (req: Request, res: Response) => {
    const response =  await fetch('http://localhost:3003/user');
    const users = await response.text();
    res.render('edit_account',{"users":users})
})

/** user itineraries */
router.route('/my_itineraries')
.get( async (req: Request, res:Response) => {
    res.render('my_itineraries');
})

// router.post('/register');
router.route('/register')
.get( async (req: Request, res: Response) => {
    res.render('register')
})

// router.post('/logout');
// router.post('/account')

module.exports = router