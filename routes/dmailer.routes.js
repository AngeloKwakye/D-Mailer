import Router from 'express';
import { addUser, getUser, login, logout } from '../controllers/user.controller.js';

const router = Router();



router.post('/register', addUser)

router.get('/:me', getUser);

router.post('/login', login);

router.post('/logout', logout)


export default router;