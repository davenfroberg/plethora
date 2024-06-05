import {Request, Response} from 'express';
import pool from '../configs/dbConfig';
import {AuthRequest} from '../middlewares/jwtAuth';

export const getFiles = (req: AuthRequest, res: Response) => {
    const username: string = req.user["username"];
    const sql: string = 'SELECT * FROM files WHERE username = $1';
    const params: string[] = [username];

    pool.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).send('Error getting files');
        } else {
            const files = result.rows;
            res.send(files);
        }
    });
};

export const uploadFile = (req: AuthRequest, res: Response) => {
    const username: string = req.user["username"];
    const {filename, filepath, size} = req.body;

    const sql: string = 'INSERT INTO files (username, file_name, file_path, size) VALUES ($1, $2, $3, $4)';
    const params: string[] = [username, filename, filepath, size];

    pool.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send('File uploaded');
        }
    });
};
