import express, {Express} from 'express';
import cors from 'cors';
import authRoutes from './routes/AuthRoutes';
import userRoutes from './routes/UserRoutes';
import fileRoutes from './routes/FileRoutes';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', fileRoutes);

const port: number = 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
