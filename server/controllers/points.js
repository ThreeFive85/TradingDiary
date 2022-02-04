import mysql from 'mysql2/promise';
import { db } from '../config/db.js';

const pool = mysql.createPool(db);

export const getPoints = async(req, res) => { // async, await

    const connection = await pool.getConnection();
    let query = `SELECT date_format(day, '%Y-%m-%d') AS day, date, point, count, rate FROM points`

    try {
        let result = await connection.query(query)
        if (result[0].length < 1) {
            console.log("nothing")
        }
        res.status(202).json(result[0])
    } catch (err) {
        console.log(err)
    } finally {
        connection.release()
    }
}