import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const routeLogger = (req: Request, res: Response, next: NextFunction) => {
    logger.info(
        `${req.method} ${req.path} params=${JSON.stringify(req.params)} body=${JSON.stringify(
            req.body
        )}}`
    );
    next();
};
