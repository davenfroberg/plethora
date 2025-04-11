import { Router } from 'express';
import { getProfile } from '../controllers/UserController';
import authenticateToken from '../middlewares/JwtAuth';

const router: Router = Router();

router.get('/profile', authenticateToken, getProfile);

export default router;
