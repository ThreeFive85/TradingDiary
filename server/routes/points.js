import express from 'express';

import { getPoints, updatePoints } from '../controllers/points.js';

const router = express.Router();

router.get('/', getPoints);
router.post('/update', updatePoints);

export default router;