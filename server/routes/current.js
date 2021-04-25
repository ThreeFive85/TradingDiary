import express from 'express';

import { getCurrentStock } from '../controllers/current.js';

const router = express.Router();

router.get('/', getCurrentStock);
export default router;