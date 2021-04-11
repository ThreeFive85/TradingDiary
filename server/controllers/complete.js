import mysql from 'mysql2/promise';
import { db } from '../config/db.js';

const pool = mysql.createPool(db);

export const completeStock = async(req, res) => { // async, await

    const connection = await pool.getConnection();

    try {
        let result = await connection.query("SELECT * FROM completeStock")
        if (result[0].length < 1) {
            throw new Error('nothing')
        }
        res.status(202).json(result[0])
    } catch (err) {
        console.log(err)
    }
}