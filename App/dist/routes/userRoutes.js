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
const router = express_1.default.Router();
router.route('/')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://localhost:3003/user');
    const users = yield response.text();
    res.render('login.ejs', { "users": users });
}));
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
