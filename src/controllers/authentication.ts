import { NextFunction, Request, Response } from 'express';
import config from '../config';

export const validateApiKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiKey = req.headers['x-api-key'] || undefined;

        if (apiKey && apiKey === config.apiKey) {
            return next();
        }

        return res.status(401).json({ message: 'Unauthorized' });
    } catch (err) {
        next(err);
    }
};
