import express, {Express, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import {Pool} from 'pg';
import jwt from 'jsonwebtoken';
import authenticateToken, {AuthRequest} from "./middleware/jwtAuth";

const app: Express = express();

app.use(express.json());
app.use(cors({credentials: true, origin: true}));

// this won't stay here
const secretKey: string = 'your-secret-key';

const pool: Pool = new Pool({
    user: 'root',
    host: 'database',
    database: 'plethora',
    password: 'root',
    port: 5432,
});

app.post('/api/register', async (req: Request, res: Response) => {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const name: string = req.body.name;

    let salt: string;
    let hashedPassword: string;

    const saltRounds: number = 10;
    try {
        salt = await bcrypt.genSalt(saltRounds);
        hashedPassword = await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error('Error hashing password');
    }

    const sql: string = 'INSERT INTO users (username, name, password_hash, password_salt) VALUES ($1, $2, $3, $4)';
    const params: string[] = [username, name, hashedPassword, salt];

    try {
        await pool.query(sql, params);
        res.send('Registered user ' + username + '!');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});

app.post('/api/login', (req: Request, res: Response) => {
    const username: string = req.body.username;
    const password: string = req.body.password;

    const sql: string = 'SELECT * FROM users WHERE username = $1';
    const params: string[] = [username];

    pool.query(sql, params, (err: any, result: any) => {
        if (err) {
            res.status(400).send('Error logging in');
        } else {
            const user = result.rows[0];
            if (user) {
                bcrypt.compare(password, user.password_hash, (err: any, result: any) => {
                    if (result) {
                        const token: string = jwt.sign({username: user.username}, secretKey, {expiresIn: 30});
                        res.json({token: token});
                    } else {
                        res.status(401).send('Username or password is incorrect.');
                    }
                });
            } else {
                res.status(401).send('Username or password is incorrect.');
            }
        }
    });
});

app.get('/api/profile/', authenticateToken, (req: AuthRequest, res: Response) => {
    const username: string = req.user["username"];
    const sql: string = 'SELECT username, name FROM users WHERE username = $1';
    const params: string[] = [username];

    pool.query(sql, params, (err: any, result: any) => {
        if (err) {
            res.status(400).send({response: 'Error getting profile'});
        } else {
            const user = result.rows[0];
            if (user) {
                res.send(user);
            } else {
                res.status(404).send({response: 'User not found'});
            }
        }
    });
});

app.get('/api/files/', authenticateToken, (req: AuthRequest, res: Response) => {
    const username: string = req.user["username"];
    const sql: string = 'SELECT * FROM files WHERE username = $1';
    const params: string[] = [username];

    pool.query(sql, params, (err: any, result: any) => {
        if (err) {
            res.status(400).send('Error getting files');
        } else {
            const files = result.rows;
            res.send(files);
        }
    });
});

const port: number = 3000;
app.listen(port, () => {
});