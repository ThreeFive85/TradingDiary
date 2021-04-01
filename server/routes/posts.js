import express from 'express';

import { getDiary } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getDiary);
// router.get('/', (req, res) => {
//     res.send('work')
// });

export default router;