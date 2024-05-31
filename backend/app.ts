import express, {Express, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app: Express = express();

app.use(express.json());
app.use(cors({credentials: true, origin: true}));



const { Pool } = require('pg');
const pool = new Pool({
    user: 'root',
    host: 'database',
    database: 'plethora',
    password: 'root',
    port: 5432,
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.post('/register', async (req: Request, res: Response) => {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const name: string = req.body.name;

    let salt: string;
    let hashedPassword: string;

    const saltRounds = 10; 
    try {
        salt = await bcrypt.genSalt(saltRounds);
        hashedPassword = await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error('Error hashing password');
    }

    const sql = 'INSERT INTO users (username, name, password_hash, password_salt) VALUES ($1, $2, $3, $4)';
    const params = [username, name, hashedPassword, salt];

    try {
        await pool.query(sql, params);
        res.send('Registered user ' + username + '!');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});

app.post('/login', (req: Request, res: Response) => {
    const username: string = req.body.username;
    const password: string = req.body.password;

    const sql = 'SELECT * FROM users WHERE username = $1';
    const params = [username];

    pool.query(sql, params, (err: any, result: any) => {
        if (err) {
            res.status(400).send('Error logging in');
        } else {
            const user = result.rows[0];
            if (user) {
                bcrypt.compare(password, user.password_hash, (err: any, result: any) => {
                    if (result) {
                        res.send('Logged in user ' + username + '!');
                    } else {
                        res.status(400).send('Username or password is incorrect.');
                    }
                });
            } else {
                res.status(400).send('Username or password is incorrect.');
            }
        }
    });
});

const port: number = 3000;
app.listen(port, () => {
});