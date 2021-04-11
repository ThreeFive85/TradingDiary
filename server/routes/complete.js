import express from 'express';

import { completeStock } from '../controllers/complete.js';

const router = express.Router();

router.get('/', completeStock);

export default router;