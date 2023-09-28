"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.route('/')
    .get((req, res) => {
    // let test = login(req,res);
    console.log('blanla');
    res.render('login.ejs');
});
router.route('/home')
    .get((req, res) => {
    router.route('/api/auth/').get((request, response) => {
        response.end();
    });
    res.render('index');
});
// router.post('/', login);
// router.post('/register');
// router.post('/logout');
// router.post('/account')
module.exports = router;
