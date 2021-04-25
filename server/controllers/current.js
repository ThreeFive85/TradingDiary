import mysql from 'mysql2/promise';
import { db } from '../config/db.js';

const pool = mysql.createPool(db);

export const getCurrentStock = async(req, res) => { // async, await

    const connection = await pool.getConnection();
    let query = 'SELECT NAME, '+
    `replace(CURRENT_COUNT, '.00000000', '') AS CURRENT_COUNT, `+
    'CURRENT_MONEY, BUY_MONEY, SELL_MONEY, FIRST_DAY, CURRENT_DAY '+
    'FROM currentStock WHERE CURRENT_COUNT > 0'

    try {
        let result1 = await connection.query(query)
        let result2 = await connection.query("SELECT * FROM currentStock WHERE CURRENT_COUNT = 0")
        // console.log(result2[0])
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
    } finally {
        connection.release()
    }
}