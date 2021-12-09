import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {useStyles, StyledTableCell, StyledTableRow} from './styles.js';
import Typography from '@material-ui/core/Typography';

import { getComplete } from '../../actions/complete';

import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';

const Complete = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const datas = useSelector((state) => state.complete) // reduecers/index.js의 posts
    // console.log(datas)

    useEffect(() => {
        dispatch(getComplete());
    }, [dispatch]);

    let cnt = 0;
    
    return (
      !datas.length ? <Typography>완료된 종목 데이터가 없습니다.</Typography> :
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>번호</StyledTableCell>
              <StyledTableCell align="right">종목</StyledTableCell>
              <StyledTableCell align="right">총매수금액&nbsp;(원)</StyledTableCell>
              <StyledTableCell align="right">총매도금액&nbsp;(원)</StyledTableCell>
              <StyledTableCell align="right">처음거래일</StyledTableCell>
              <StyledTableCell align="right">마지막거래일</StyledTableCell>
              <StyledTableCell align="right">수익률&nbsp;(%)</StyledTableCell>
              <StyledTableCell align="right">수익금&nbsp;(원)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map((data) => (
              <StyledTableRow key={data.id}>
                <StyledTableCell component="th" scope="row">
                  {cnt += 1}
                </StyledTableCell>
                <StyledTableCell align="right">{data.name}</StyledTableCell>
                <StyledTableCell align="right">{(data.buy_money).toLocaleString()}</StyledTableCell>
                <StyledTableCell align="right">{(data.sell_money).toLocaleString()}</StyledTableCell>
                <StyledTableCell align="right">{data.first_day.substring(0,10)}</StyledTableCell>
                <StyledTableCell align="right">{data.final_day.substring(0,10)}</StyledTableCell>
                <StyledTableCell align="right">{Math.round(((data.sell_money/data.buy_money)-1)* 100)}</StyledTableCell>
                <StyledTableCell align="right">{(data.sell_money - data.buy_money).toLocaleString()}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default Complete