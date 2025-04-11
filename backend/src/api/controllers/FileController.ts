import {Request, Response} from 'express';
import pool from '../configs/DbConfig';
import {AuthRequest} from '../middlewares/JwtAuth';
import multer from 'multer';
import path from 'path';

const upload = multer({ dest: path.join(__dirname, '../../uploads/') });

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
    const upload = multer({ dest: path.join(__dirname, '../../uploads/') });
    upload.single('file')(req, res, (err) => {
        if (err) {
            res.status(400).send('Error uploading file');
        } else {
            res.send('File uploaded');
        }
    });
};  

export const createFile = (req: AuthRequest, res: Response) => {
    const username: string = req.user["username"];
    const {filename, filepath, size, isDirectory} = req.body;

    const sql: string = 'INSERT INTO files (username, file_name, file_path, size, is_directory) VALUES ($1, $2, $3, $4, $5)';
    const params: string[] = [username, filename, filepath, size, isDirectory];

    pool.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).send('Error creating file');
        } else {
            res.send('File created');
        }
    });
};

export const deleteFile = (req: AuthRequest, res: Response) => {
    const username: string = req.user["username"];
    const {filename, filepath} = req.body;
    const sql: string = 'DELETE FROM files WHERE username = $1 AND file_name = $2 AND file_path = $3';
    const params: string[] = [username, filename, filepath];

    pool.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).send('Error deleting file');
        } else {
            res.send('File deleted');
        }
    });
};
