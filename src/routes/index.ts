import { Router, Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/errorHandlers/CustomError';

import apiRoutes from './api';

const router = Router();

router.use('/api', apiRoutes);

router.use((req: Request, res: Response, next: NextFunction) => {
    const err = new CustomError(`Not Found`);
    err.status = 404;
    next(err);
});

export default router;
