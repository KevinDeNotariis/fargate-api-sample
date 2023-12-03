import { Router } from 'express';
import { body } from 'express-validator';
import { stringReplace } from '../../../controllers/stringManipulations';

const router = Router();

router.post('/replace', body('content').exists().trim().isString(), stringReplace);

export default router;
