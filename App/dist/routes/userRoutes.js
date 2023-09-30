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
const router = express_1.default.Router();
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.route('/home')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const response =  await fetch('http://localhost:3003/user');
    // const users = await response.text();
    // if user connecté : retour sur render espace personnel 
    // else render login ejs
    res.render('login', { "errorMsg": "" });
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const users = await response.text();
    console.log(console.log(req.body));
    let logPass = {
        email: req.body.email,
        password: yield bcrypt_1.default.hash(req.body.password, 10)
    };
    console.log(logPass);
    const response = yield fetch('http://localhost:3003/user', {
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
            console.log(compare);
            if (compare == true) {
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
router.route('/login').get((req, res) => {
    res.render('login.ejs' /*,{"users":users}*/);
});
router.route('/')
    .get((req, res) => {
    router.route('/api/auth/').get((request, response) => {
        response.end();
    });
    res.render('index');
});
/* Route account */
router.route('/account')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const response =  await fetch('http://localhost:3003/user');
    // const users = await response.text();
    res.render('account' /*,{"users":users}*/);
}));
/*edit account */
router.route('/edit_account')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://localhost:3003/user');
    const users = yield response.text();
    res.render('edit_account', { "users": users });
}));
// router.post('/register');
router.route('/register')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('register');
}));
// router.post('/logout');
// router.post('/account')
module.exports = router;
