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

    const insertData = {
        NAME: 종목명, 
        CURRENT_COUNT: 매매수량, 
        CURRENT_MONEY: 매매금액, 
        BUY_MONEY: 매매금액, 
        SELL_MONEY: 0,
        FIRST_DAY: 매매일자
    }

    const selectQuery = 'select NAME from currentStock where NAME = '
    const insertQuery = 'insert into currentStock set ?'
    const plusQuery = 'update currentStock set current_count = current_count + ?,'+
                        'CURRENT_MONEY = CURRENT_MONEY + ?, BUY_MONEY = BUY_MONEY + ?, CURRENT_DAY=? where NAME = '
    const minusQuery = 'update currentStock set current_count = current_count - ?, '+
                        'CURRENT_MONEY = CURRENT_MONEY - ?, SELL_MONEY = SELL_MONEY + ?, CURRENT_DAY=? where NAME = '

    try {
        
        if(매매형태 === '매수'){
            const [result1, fields] = await connection.query(selectQuery+mysql.escape(req.body.종목명), {NAME:종목명})
            if (result1[0] === undefined ) {
                const [createData, fields1] = await connection.query(insertQuery, insertData)
                res.status(202).json({createData})
            } else {
                const current_count = 매매수량
                const current_money = 매매금액
                const current_day = 매매일자
                const [plusData, fields2] = await connection.query(plusQuery+mysql.escape(req.body.종목명), [current_count, current_money, current_money, current_day])
                res.status(202).json({plusData})
            }
        } else {
            const current_count = 매매수량
            const current_money = 매매금액
            const current_day = 매매일자
            const [minusData, fields2] = await connection.query(minusQuery+mysql.escape(req.body.종목명), [current_count, current_money, current_money, current_day])
            res.status(202).json({minusData})
        }
    } catch (err) {
        console.log(err)
    }
}