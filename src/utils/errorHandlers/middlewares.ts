import { NextFunction, Request, Response } from 'express';
import { CustomError } from './CustomError';
import logger from '../logger';

export const errorLogging = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        logger.error(
            `error=${JSON.stringify({
                message: err.message,
                name: 'CustomError',
                additionalInfo: err.additionalInfo,
            })}`
        );
    }

    logger.error(
        `error=${JSON.stringify({ message: err.message, name: err.name, additionalInfo: {} })}`
    );
    next(err);
};

export const handleError = (
    err: TypeError | CustomError,
    req: Request,
    res: Response,
    _: NextFunction
) => {
    let customError = err;
    if (!(err instanceof CustomError)) {
        if (err instanceof SyntaxError) {
            customError = new CustomError('Something went wrong in decoding Payload', 400);
        } else {
            customError = new CustomError('Internal Server Error');
        }
    }

    return res.status((customError as CustomError).status).send({ message: customError.message });
};
