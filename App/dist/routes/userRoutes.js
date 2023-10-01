"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const jwtSecret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIwIjp7ImlkIjoxLCJub20iOiJEb2UiLCJwcmVub20iOiJKb2huIiwiZW1haWwiOiJqb2huQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEpGWUJHSW9obDdsc000SkIyZnhONHV2Vy9zcXFsZkxBaTJ1NFVLaUR2UFUubHZZQWRQS0llIn0sImlhdCI6MTY5NjE1MDcxOX0.KQ0XyJB8w4WrQkvyKkjOPt6PCJRJRl09NC2w6UYMadw';
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.route('/home')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const response =  await fetch('http://localhost:3003/user');
    // const users = await response.text();
    // if user connecté : retour sur render espace personnel 
    // else render login ejs
    res.render('user_space.ejs', { "isLogged": req.cookies.jwt });
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let logPass = {
        email: req.body.email,
        password: yield bcrypt_1.default.hash(req.body.password, 10)
    };
    const response = yield fetch('http://localhost:3003/login', {
        method: 'POST',
        body: JSON.stringify(logPass),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        let user = data;
        if (user.results) {
            let compare = yield bcrypt_1.default.compare(req.body.password, user.results[0].password);
            if (compare == true) {
                res.cookie("jwt", user.token, {
                    httpOnly: true,
                    maxAge: (3 * 60 * 60) * 1000, // 3hrs in ms
                });
                console.log(user);
                res.redirect('account' /*,{"users":users}*/);
            }
            else {
                res.render('login', { "errorMsg": "Email ou mot de passe incorrect" });
            }
        }
        else {
            res.render('login', { "errorMsg": "Email ou mot de passe incorrect" });
        }
    }));
    // if user connecté : retour sur render espace personnel 
    // else render login ejs
}));
// router.post('/register');
router.route('/register')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('register', { "isLogged": req.cookies.jwt });
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const users = await response.text();
    console.log(req.body);
    let registerDatas = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: yield bcrypt_1.default.hash(req.body.password, 10)
    };
    if (req.body.password == req.body.confirmpass) {
        const response = yield fetch('http://localhost:3003/register', {
            method: 'POST',
            body: JSON.stringify(registerDatas),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(data);
            if (data.status == true) {
                res.redirect("login");
            }
        }));
    }
    else {
        res.render("register", { "errorMsg": "Erreur d'inscription" });
    }
}));
router.route('/login').get((req, res) => {
    res.render('login.ejs', { "isLogged": req.cookies.jwt });
});
router.route('/')
    .get((req, res) => {
    router.route('/api/auth/').get((request, response) => {
        response.end();
    });
    res.render('index', { "isLogged": req.cookies.jwt });
});
/* Route account */
router.route('/account')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies.jwt) {
        jsonwebtoken_1.default.verify(req.cookies.jwt, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.render('login', { "errorMsg": "Accès non autorisé veuillez vous authentifier!" });
            }
            else {
                res.render('account', { "isLogged": req.cookies.jwt });
            }
        });
    }
    else {
        res.render('login', { "errorMsg": "Accès non autorisé veuillez vous authentifier!", "isLogged": req.cookies.jwt });
    }
}));
/*edit account */
router.route('/edit_account')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://localhost:3003/user');
    const users = yield response.text();
    res.render('edit_account', { "users": users, "isLogged": req.cookies.jwt });
}));
/** user itineraries */
router.route('/my_itineraries')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('my_itineraries', { "isLogged": req.cookies.jwt });
}));
// router.post('/register');
router.route('/register')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('register', { "isLogged": req.cookies.jwt });
}));
router.route('/map')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('map', { "isLogged": req.cookies.jwt });
}));
// router.post('/logout');
// router.post('/account')
module.exports = router;
