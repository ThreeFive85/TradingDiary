import express from 'express';

import { getCurrentStock, updateCurrent, createCurrent } from '../controllers/current.js';

const router = express.Router();

router.get('/', getCurrentStock);
router.post('/update', updateCurrent);
router.post('/', createCurrent);
export default router;