import express, {Express} from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import fileRoutes from './routes/fileRoutes';

const app: Express = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', fileRoutes);

const port: number = 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});