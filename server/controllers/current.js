import mysql from 'mysql2/promise';
import { db } from '../config/db.js';

const pool = mysql.createPool(db);

export const getCurrentStock = async(req, res) => { // async, await

    const connection = await pool.getConnection();
    let query = 'SELECT NAME, VALUE,'+
    `replace(CURRENT_COUNT, '.00000000', '') AS CURRENT_COUNT, `+
    'CURRENT_MONEY, BUY_MONEY, SELL_MONEY, FIRST_DAY, CURRENT_DAY '+
    'FROM currentStock WHERE CURRENT_COUNT > 0'

    try {
        let result1 = await connection.query(query)
        
        if (result1[0].length < 1) {
            console.log('nothing')
        }
        
        res.status(202).json(result1[0])
    } catch (err) {
        console.log(err)
    } finally {
        connection.release()
    }
}

export const updateCurrent = async(req, res) => { // async, await
    const {종목명, 종목형태, 매매형태, 매매단가, 매매수량, 매매금액, 매매일자} = req.body;

    const connection = await pool.getConnection();
    
    const plusQuery = 'update currentStock set current_count = current_count + ?,'+
                        'CURRENT_MONEY = CURRENT_MONEY + ?, BUY_MONEY = BUY_MONEY + ?, CURRENT_DAY=? where NAME = '
    const minusQuery = 'update currentStock set current_count = current_count - ?, '+
                        'CURRENT_MONEY = CURRENT_MONEY - ?, SELL_MONEY = SELL_MONEY + ?, CURRENT_DAY=? where NAME = '

    try {
        if(매매형태 === '매수'){
            const current_count = 매매수량
            const current_money = 매매금액
            const current_day = 매매일자
            const [plusData, fields2] = await connection.query(plusQuery+mysql.escape(req.body.종목명), [current_count, current_money, current_money, current_day])
            let query = 'SELECT NAME, VALUE,'+
            `replace(CURRENT_COUNT, '.00000000', '') AS CURRENT_COUNT, `+
            'CURRENT_MONEY, BUY_MONEY, SELL_MONEY, FIRST_DAY, CURRENT_DAY '+
            'FROM currentStock WHERE CURRENT_COUNT > 0 and NAME=?'
        
            const result = await connection.query(query, [종목명])
            console.log(result[0][0])
            res.status(202).json(result[0][0])
        } else {
            const current_count = 매매수량
            const current_money = 매매금액
            const current_day = 매매일자
            const [minusData, fields2] = await connection.query(minusQuery+mysql.escape(req.body.종목명), [current_count, current_money, current_money, current_day])
            let query = 'SELECT NAME, VALUE,'+
                    `replace(CURRENT_COUNT, '.00000000', '') AS CURRENT_COUNT, `+
                    'CURRENT_MONEY, BUY_MONEY, SELL_MONEY, FIRST_DAY, CURRENT_DAY '+
                    'FROM currentStock WHERE NAME=?'
                
            const result = await connection.query(query, [종목명])
            // console.log(result[0][0])
            if(result[0][0].CURRENT_COUNT === '0'){
                let insertData = {
                    name: result[0][0].NAME,
                    buy_money: result[0][0].BUY_MONEY,
                    sell_money: result[0][0].SELL_MONEY,
                    first_day: result[0][0].FIRST_DAY,
                    final_day: result[0][0].CURRENT_DAY
                }
    
                const [data, fields] = await connection.query('insert into completeStock set ?', insertData);
                console.log(data)
                const [data1, fields1] = await connection.query('delete from currentStock where NAME = ?',[종목명]);
                console.log(data1)
                res.json({message: '해당 종목이 completeStock으로 이동'})
            } else {
                res.status(202).json(result[0][0]);
            }
        }
    } catch (err) {
        console.log(err)
    } finally {
        connection.release()
    }
}

export const createCurrent = async(req, res) => { // async, await

    const {종목명, 종목형태, 매매형태, 매매단가, 매매수량, 매매금액, 매매일자} = req.body;

    const insertCurrentData = {
        NAME: 종목명, 
        VALUE: 종목형태,
        CURRENT_COUNT: 매매수량, 
        CURRENT_MONEY: 매매금액, 
        BUY_MONEY: 매매금액, 
        SELL_MONEY: 0,
        FIRST_DAY: 매매일자
    }

    const insertCurrentQuery = 'insert into currentStock set ?'

    // console.log(req.body)

    const connection = await pool.getConnection();

    try {
        const [createData, fields1] = await connection.query(insertCurrentQuery, insertCurrentData);
        let query = 'SELECT NAME, VALUE,'+
                    `replace(CURRENT_COUNT, '.00000000', '') AS CURRENT_COUNT, `+
                    'CURRENT_MONEY, BUY_MONEY, SELL_MONEY, FIRST_DAY, CURRENT_DAY '+
                    'FROM currentStock WHERE CURRENT_COUNT > 0 and NAME=?'
                
        const result = await connection.query(query, [종목명])
        // console.log(result[0][0])
        res.status(202).json(result[0][0])
    } catch (err) {
        console.log(err)
    } finally {
        connection.release()
    }
}