import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// this won't stay here
const secretKey: string = 'your-secret-key';

export interface AuthRequest extends Request {
    user?: any;
}

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("trying to validate!");
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

export default authenticateToken;