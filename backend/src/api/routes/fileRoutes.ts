import { Router } from 'express';
import { getFiles, uploadFile } from '../controllers/FileController';
import authenticateToken from '../middlewares/JwtAuth';

const router: Router = Router();

router.get('/files', authenticateToken, getFiles);
router.post('/upload', authenticateToken, uploadFile);

export default router;
