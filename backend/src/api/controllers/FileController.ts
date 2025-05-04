import {Request, Response} from 'express';
import pool from '../configs/DbConfig';
import {AuthRequest} from '../middlewares/JwtAuth';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import util from 'util';

const upload = multer({ dest: path.join(__dirname, '../../uploads/') });

export const getFiles = (req: AuthRequest, res: Response) => {
    const username: string = req.user["username"];
    const sql: string = 'SELECT file_name, file_path, upload_date, is_directory, size FROM files WHERE username = $1';
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
    console.log("uploading file");
    upload.single('file')(req, res, (err) => {
        if (err) {
            res.status(400).send('Error uploading file');
        } else {
            if (req.file) {
                const uploadedFilename = req.file.filename;
                const originalName = req.file.originalname;
                const sql: string = 'UPDATE files SET filesystem_name = $1 WHERE username = $2 AND file_name = $3 AND filesystem_name = \'default_filesystem\'';
                const params: string[] = [uploadedFilename, req.user["username"], originalName];
                pool.query(sql, params, (err, result) => {
                    if (err) {
                        res.status(400).send('Error uploading file');
                    } else {
                        res.send({ message: 'File uploaded', uploadedFilename });
                    }
                });
            }
            else {
                res.status(400).send('Error uploading file');
            }
        }
    });
};  

export const createFile = (req: AuthRequest, res: Response) => {
    console.log("creating file");
    const username: string = req.user["username"];
    const {filename, filepath, size, isDirectory} = req.body;

    const sql: string = 'INSERT INTO files (username, file_name, file_path, size, is_directory) VALUES ($1, $2, $3, $4, $5)';
    const params: string[] = [username, filename, filepath, size, isDirectory];

    pool.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send('Error creating file');
        } else {
            res.send('File created');
        }
    });
};

const unlinkAsync = util.promisify(fs.unlink);

export const deleteFile = async (req: AuthRequest, res: Response) => {
    const username: string = req.user["username"];
    const { filename, filepath } = req.body;

    const selectSql = 'SELECT filesystem_name FROM files WHERE username = $1 AND file_name = $2 AND file_path = $3';
    const selectParams: string[] = [username, filename, filepath];

    pool.query(selectSql, selectParams, async (err, result) => {
        if (err || result.rows.length === 0) {
            res.status(400).send('Error finding file');
            return;
        }

        const filesystemName = result.rows[0].filesystem_name;
        const filePath = path.join(__dirname, '../../uploads/', filesystemName);

        try {
            await unlinkAsync(filePath);
        } catch (fsErr) {
            console.error('Error deleting file from filesystem:', fsErr);
        }

        const deleteSql = 'DELETE FROM files WHERE username = $1 AND file_name = $2 AND file_path = $3';
        const deleteParams: string[] = [username, filename, filepath];

        pool.query(deleteSql, deleteParams, (delErr, delResult) => {
            if (delErr) {
                res.status(400).send('Error deleting file');
            } else {
                res.send('File deleted');
            }
        });
    });
};
