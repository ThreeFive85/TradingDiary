import express from 'express';

import { getDiary, createDiary } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getDiary);
router.post('/', createDiary);

export default router;