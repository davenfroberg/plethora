import { Router } from 'express';
import { getProfile } from '../controllers/userController';
import authenticateToken from '../middlewares/jwtAuth';

const router: Router = Router();

router.get('/profile', authenticateToken, getProfile);

export default router;
