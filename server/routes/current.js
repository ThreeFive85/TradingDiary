import express from 'express';

import { getCurrentStock, updateCurrent } from '../controllers/current.js';

const router = express.Router();

router.get('/', getCurrentStock);
router.get('/:name', updateCurrent);
export default router;