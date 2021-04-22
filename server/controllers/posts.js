import mysql from 'mysql2/promise';
import { db } from '../config/db.js';

const pool = mysql.createPool(db);

export const getDiary = async(req, res) => { // async, await

    const connection = await pool.getConnection();
    let query = 'SELECT 종목명, 종목형태, 매매형태, 매매단가, '+
    `replace(매매수량, '.00000000', '') AS 매매수량, `+
    '매매금액, 매매일자 FROM diary'

    try {
        let result = await connection.query(query)
        if (result[0].length < 1) {
            throw new Error('nothing')
        }
        res.status(202).json(result[0])
    } catch (err) {
        console.log(err)
    } finally {
        connection.release()
    }
}

export const createDiary = async(req, res) => { // async, await

    const {종목명, 종목형태, 매매형태, 매매단가, 매매수량, 매매금액, 매매일자} = req.body;

    console.log(req.body)

    const connection = await pool.getConnection();

    try {
        const data = await connection.query('insert into diary set ?', { 종목명: 종목명, 종목형태: 종목형태,
        매매형태: 매매형태, 매매단가: 매매단가, 매매수량: 매매수량, 매매금액: 매매금액, 매매일자: 매매일자 })
        
        res.status(202).json(data[0])
    } catch (err) {
        console.log(err)
    } finally {
        connection.release()
    }
}

