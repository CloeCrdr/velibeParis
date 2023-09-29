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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import db from '../config/db.config'
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifiant, password } = req.body;
    try {
        // const user = db.query("SELECT * FROM user WHERE email = ?", req.body.email)
        // if(!user) {
        //     return res.status(401).json({statut : 'Erreur', message: 'Identifiant ou mot de passe incorrect' });
        // }
        // const passwordMatch = await bcrypt.compare(password, user.password)
        // if (!passwordMatch) {
        //     return res.status(401).json({ statut: 'Erreur', message: 'Identifiant ou mot de passe incorrect' });
        // }
        // const token = jwt.sign({ userId: user.id }, '//clésecrète');
        // res.status(200).json({ statut: 'Succès', token });
        // const response = await fetch('http://localhost:3003/user');
        // const data = await response.text();
        // console.log(data);
        // // Faites quelque chose avec la réponse (data)
        // res.send(data);
        console.log(req.body);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ statut: 'Erreur', message: 'Erreur serveur' });
    }
});
exports.login = login;
