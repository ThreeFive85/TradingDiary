import express from 'express';

import { getDiary, createDiary, getStock } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getDiary);
router.post('/', createDiary);
router.patch('/:name', getStock);

export default router;