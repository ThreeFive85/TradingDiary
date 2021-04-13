import mysql from 'mysql2/promise';
import { db } from '../config/db.js';

const pool = mysql.createPool(db);

export const getCurrentStock = async(req, res) => { // async, await

    const connection = await pool.getConnection();

    try {
        let result1 = await connection.query("SELECT * FROM currentStock WHERE CURRENT_COUNT > 0")
        let result2 = await connection.query("SELECT * FROM currentStock WHERE CURRENT_COUNT = 0")
        console.log(result2[0])
        if (result1[0].length < 1) {
            console.log('nothing')
        }
        
        if (result2[0].length > 0) {
            for(let i = 0; i < result2[0].length; i++){
                let name = result2[0][i].NAME;
                let buy_money = result2[0][i].BUY_MONEY;
                let sell_money = result2[0][i].SELL_MONEY;
                let first_day = result2[0][i].FIRST_DAY;
                let final_day = result2[0][i].CURRENT_DAY;
    
                let insertData = {
                    name: name,
                    buy_money: buy_money,
                    sell_money: sell_money,
                    first_day: first_day,
                    final_day: final_day
                }
    
                const [data, fields] = await connection.query('insert into completeStock set ?', insertData);
                console.log(data)
                const [data1, fields1] = await connection.query('delete from currentStock where NAME = ?',[name]);
                console.log(data1)
            }
        }
        res.status(202).json(result1[0])
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