import express from 'express';

import { getDiary, createDiary } from '../controllers/posts.js';
import { getCurrentStock, createCurrentStock } from '../controllers/current.js';

const router = express.Router();

router.get('/', getDiary);
router.post('/', createDiary);

export default router;