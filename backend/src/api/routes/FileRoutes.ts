import { Router } from 'express';
import { getFiles, createFile, deleteFile, uploadFile } from '../controllers/FileController';
import authenticateToken from '../middlewares/JwtAuth';

const router: Router = Router();

router.get('/files', authenticateToken, getFiles);
router.post('/files', authenticateToken, createFile);
router.delete('/files', authenticateToken, deleteFile);
router.post('/files/upload', authenticateToken, uploadFile);

export default router;
