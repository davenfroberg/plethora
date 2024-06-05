import {Request, Response} from 'express';
import pool from '../configs/dbConfig';
import {AuthRequest} from '../middlewares/jwtAuth';

export const getProfile = (req: AuthRequest, res: Response) => {
    const username: string = req.user["username"];
    const sql: string = 'SELECT username, name FROM users WHERE username = $1';
    const params: string[] = [username];

    pool.query(sql, params, (err, result) => {
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
};