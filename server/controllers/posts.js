import mysql from 'mysql2/promise';
import { db } from '../config/db.js';

const pool = mysql.createPool(db);

export const getDiary = async(req, res) => { // async, await

    const connection = await pool.getConnection();
    let query = 'SELECT ID, 종목명, 종목형태, 매매형태, 매매단가, '+
    `replace(매매수량, '.00000000', '') AS 매매수량, `+
    '매매금액, 매매일자 FROM diary'

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

export const createDiary = async(req, res) => { // async, await

    const {종목명, 종목형태, 매매형태, 매매단가, 매매수량, 매매금액, 매매일자} = req.body;

    const insertCurrentData = {
        NAME: 종목명, 
        CURRENT_COUNT: 매매수량, 
        CURRENT_MONEY: 매매금액, 
        BUY_MONEY: 매매금액, 
        SELL_MONEY: 0,
        FIRST_DAY: 매매일자
    }

    const insertCurrentQuery = 'insert into currentStock set ?'
    const selectQuery = 'select NAME from currentStock where NAME = '
    const plusQuery = 'update currentStock set current_count = current_count + ?,'+
                        'CURRENT_MONEY = CURRENT_MONEY + ?, BUY_MONEY = BUY_MONEY + ?, CURRENT_DAY=? where NAME = '
    const minusQuery = 'update currentStock set current_count = current_count - ?, '+
                        'CURRENT_MONEY = CURRENT_MONEY - ?, SELL_MONEY = SELL_MONEY + ?, CURRENT_DAY=? where NAME = '

    // console.log(req.body)

    const connection = await pool.getConnection();

    try {
        const data = await connection.query('insert into diary set ?', { 종목명: 종목명, 종목형태: 종목형태,
        매매형태: 매매형태, 매매단가: 매매단가, 매매수량: 매매수량, 매매금액: 매매금액, 매매일자: 매매일자 })
        // console.log("data : ", data)
        let query = 'SELECT ID, 종목명, 종목형태, 매매형태, 매매단가, '+
                `replace(매매수량, '.00000000', '') AS 매매수량, `+
                '매매금액, 매매일자 FROM diary WHERE ID = ?'
                
        const result = await connection.query(query, [data[0].insertId])
        res.status(202).json(result[0][0])
                
        if(매매형태 === '매수'){
            const [result1, fields] = await connection.query(selectQuery+mysql.escape(req.body.종목명), {NAME:종목명})
            if (result1[0] === undefined ) {
                const [createData, fields1] = await connection.query(insertCurrentQuery, insertCurrentData)
                res.status(202).json(createData[0])
            } else {
                const current_count = 매매수량
                const current_money = 매매금액
                const current_day = 매매일자
                const [plusData, fields2] = await connection.query(plusQuery+mysql.escape(req.body.종목명), [current_count, current_money, current_money, current_day])
                // console.log(plusData)
                res.status(202).json(plusData[0])
            }
        } else {
            const current_count = 매매수량
            const current_money = 매매금액
            const current_day = 매매일자
            const [minusData, fields2] = await connection.query(minusQuery+mysql.escape(req.body.종목명), [current_count, current_money, current_money, current_day])
            res.status(202).json(minusData[0])
        }
    } catch (err) {
        console.log(err)
    } finally {
        connection.release()
    }
}

