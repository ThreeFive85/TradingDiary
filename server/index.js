import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import currentRoutes from './routes/current.js';
import completeRoutes from './routes/complete.js';
import { db } from './config/db.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());
app.use('/diary', postRoutes);
app.use('/current', currentRoutes);
app.use('/complete', completeRoutes);


const PORT = process.env.PORT || 4000;

const connection = mysql.createConnection(db);

connection.connect();
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
