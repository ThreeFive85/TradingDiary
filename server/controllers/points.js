import mysql from 'mysql2/promise';
import { db } from '../config/db.js';

const pool = mysql.createPool(db);

export const getPoints = async(req, res) => { // async, await

    const connection = await pool.getConnection();
    let query = `SELECT date_format(day, '%Y-%m-%d') AS day, date, point, count, rate, memo FROM points`

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

export const updatePoints = async(req, res) => { // async, await
    const connection = await pool.getConnection();
    const {date, title, url} = req.body;

    const fullDate = date + ' 12:00:00';

    const insertData = title + ' ' + url;

    const updateQuery = 'update points set memo=? where day= '
    
    try {
        await connection.query(updateQuery+mysql.escape(req.body.date+' 12:00:00'), [insertData]);
        let query = `SELECT date_format(day, '%Y-%m-%d') AS day, date, point, count, rate, memo FROM points WHERE day=?`;
        const result = await connection.query(query, [fullDate]);
            // console.log(result[0][0])
            res.status(202).json(result[0][0])
    } catch (err) {
        console.log(err)
    } finally {
        connection.release()
    }
}