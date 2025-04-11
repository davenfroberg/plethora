import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../configs/DbConfig';

const secretKey: string = 'your-secret-key';

export const register = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    try {
        const salt: string = await bcrypt.genSalt(10);
        const hashedPassword: string = await bcrypt.hash(password, salt);

        const sql: string = 'INSERT INTO users (username, password_hash, password_salt) VALUES ($1, $2, $3)';
        const params: string[] = [username, hashedPassword, salt];

        await pool.query(sql, params);
        res.send('Registered user ' + username + '!');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
};

export const login = (req: Request, res: Response) => {
    const {username, password} = req.body;

    const sql: string = 'SELECT * FROM users WHERE username = $1';
    const params: string[] = [username];

    pool.query(sql, params, (err, result) => {
        if (err) {
            return res.status(400).send('Error logging in');
        }

        const user = result.rows[0];
        if (user) {
            bcrypt.compare(password, user.password_hash, (err, result) => {
                if (result) {
                    const token = jwt.sign({username: user.username}, secretKey, {expiresIn: "4h"});
                    res.json({token});
                } else {
                    res.status(401).send('Username or password is incorrect.');
                }
            });
        } else {
            res.status(401).send('Username or password is incorrect.');
        }
    });
};
