import { Router } from 'express';
import { stringReplace } from '../../../controllers/stringManipulations';

const router = Router();

router.post('/replace', stringReplace);

export default router;
