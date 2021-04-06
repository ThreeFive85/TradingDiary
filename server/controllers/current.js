import mysql from 'mysql2/promise';
import { db } from '../config/db.js';

const pool = mysql.createPool(db);

export const getCurrentStock = async(req, res) => { // async, await

    const connection = await pool.getConnection();

    try {
        let result = await connection.query("SELECT * FROM currentStock")
        if (result[0].length < 1) {
            throw new Error('nothing')
        }
        res.status(202).json(result[0])
    } catch (err) {
        console.log(err)
    }
}

export const createCurrentStock = async(req, res) => { // async, await

    const {종목명, 종목형태, 매매형태, 매매단가, 매매수량, 매매금액, 매매일자} = req.body;

    console.log(req.body)

    const connection = await pool.getConnection();

    try {
        // const data = await connection.query('insert into currentStock set ?', { NAME: 종목명, 
        //     CURRENT_COUNT: 매매수량, CURRENT_MONEY: 매매금액, FIRST_DAY: 매매일자 })

        //const [data, fields] = await connection.query(`INSERT INTO currentStock (NAME, CURRENT_COUNT, CURRENT_MONEY, FIRST_DAY) VALUES (${종목명}, ${매매수량}, ${매매금액}, ${매매일자}) ON DUPLICATE KEY UPDATE CURRENT_COUNT = CURRENT_COUNT + ${매매수량}, CURRENT_MONEY = CURRENT_MONEY + ${매매금액}, CURRENT_DAY = ${매매일자}`)
        
        const [result1, fields] = await connection.query(`select NAME from currentStock`, {NAME:종목명})
        if (result1[0] === undefined) {
            const [createData, fields1] = await connection.query('insert into currentStock set ?', {NAME: 종목명, CURRENT_COUNT: 매매수량, CURRENT_MONEY: 매매금액, FIRST_DAY: 매매일자})
            res.status(202).json({createData})
        } else {
            const [updateDate, fields2] = await connection.query(`update currentStock set NAME=?, CURRENT_COUNT = CURRENT_COUNT + ?, CURRENT_MONEY : CURRENT_MONEY + ?, CURRENT_DAY=?`, {NAME: 종목명, CURRENT_COUNT: 매매수량, CURRENT_MONEY: 매매금액, CURRENT_DAY: 매매일자})
            res.status(202).json({updateDate})
        }
    } catch (err) {
        console.log(err)
    }
}