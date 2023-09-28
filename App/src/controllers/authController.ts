import { Express, Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import db from '../config/db.config'

export const login = async(req: Request, res: Response) => {
    const { identifiant, password} = req.body;

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

        const response = await fetch('http://localhost:3003/user');
        const data = await response.text();
        console.log(data);
        // Faites quelque chose avec la réponse (data)
        res.send(data);
        
    } catch (error){
        console.error(error);
        res.status(500).json({ statut: 'Erreur', message: 'Erreur serveur'});
    }
}