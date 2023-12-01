import { Router } from 'express';

import stringRoute from './string';

const router = Router();

router.use('/string', stringRoute);

export default router;
