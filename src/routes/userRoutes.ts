import express, { Router } from 'express';
//import { login } from '../controllers/authController';

const router = Router();

//router.post('/', login);
router.post('/register');
router.post('/logout');
router.post('/account')

export default router;