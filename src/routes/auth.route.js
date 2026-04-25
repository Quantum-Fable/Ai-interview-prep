import {Router} from 'express';
import { signupController } from '../controllers/auth.controller.js';

const router = Router();

// register user
router.post("/signup", signupController);


export default router;   