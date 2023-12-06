import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const routeLogger = (req: Request, res: Response, next: NextFunction) => {
    const routeToSkipLogging = '/status/health';

    if (req.path === routeToSkipLogging) {
        return next();
    }

    logger.info(
        `${req.method} ${req.path} params=${JSON.stringify(req.params)} body=${JSON.stringify(
            req.body
        )}`
    );
    return next();
};
