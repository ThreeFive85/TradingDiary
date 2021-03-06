import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { getCurrent } from '../../actions/current';

import { useSelector, useDispatch } from 'react-redux';

import useStyles from './styles';

const Holding = ({setCurrentId}) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const datas = useSelector((state) => state.current) 
    // console.log(datas)
    
    useEffect(() => {
      dispatch(getCurrent());
    }, [dispatch]);
    return (
      !datas.length ? <div>현재 보유 종목 데이터가 없습니다</div> :
          <><><div>
          <Typography className={classes.heading}>현재 보유 종목</Typography>
        </div></>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>종목</TableCell>
                <TableCell align="right">분류</TableCell>
                <TableCell align="right">보유수량</TableCell>
                <TableCell align="right">투자금액&nbsp;(원)</TableCell>
                <TableCell align="right">매수금액&nbsp;(원)</TableCell>
                <TableCell align="right">매도금액&nbsp;(원)</TableCell>
                <TableCell align="right">최초투자일시</TableCell>
                <TableCell align="right">최근투자일시</TableCell>
                <TableCell align="center">매수/매도</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas.map((data) => (
                <TableRow key={data.NAME}>
                  <TableCell component="th" scope="row">
                    {data.NAME}
                  </TableCell>
                  <TableCell align="right">{data.VALUE}</TableCell>
                  <TableCell align="right">{data.CURRENT_COUNT}</TableCell>
                  <TableCell align="right">{data.CURRENT_MONEY.toLocaleString()}</TableCell>
                  <TableCell align="right">{data.BUY_MONEY.toLocaleString()}</TableCell>
                  <TableCell align="right">{data.SELL_MONEY.toLocaleString()}</TableCell>
                  <TableCell align="right">{data.FIRST_DAY.substring(0, 10)}</TableCell>
                  <TableCell align="right">{!data.CURRENT_DAY ? '' : data.CURRENT_DAY.substring(0, 10)}</TableCell>
                  <TableCell align="center">
                    <Button className={classes.choice} variant="outlined" color="primary" size="small" onClick={() => setCurrentId([data, '매수'])}>
                      Buy
                    </Button>
                    <Button className={classes.choice} variant="outlined" color="primary" size="small" onClick={() => setCurrentId([data, '매도'])}>
                      Sell
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer></>
    )
}

export default Holding
