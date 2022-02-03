import express from 'express';

import { getPoints } from '../controllers/points.js';

const router = express.Router();

router.get('/', getPoints);

export default router;