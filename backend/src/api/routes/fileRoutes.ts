import { Router } from 'express';
import { getFiles, uploadFile } from '../controllers/fileController';
import authenticateToken from '../middlewares/jwtAuth';

const router: Router = Router();

router.get('/files', authenticateToken, getFiles);
router.post('/upload', authenticateToken, uploadFile);

export default router;
