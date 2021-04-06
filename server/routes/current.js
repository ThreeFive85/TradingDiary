import express from 'express';

import { getCurrentStock, createCurrentStock } from '../controllers/current.js';

const router = express.Router();

router.get('/', getCurrentStock);
router.post('/', createCurrentStock);

export default router;