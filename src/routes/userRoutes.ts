import express, { Router } from 'express';
import { login } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.post('/register');
router.post('/logout');
router.post('/account')

export default router;