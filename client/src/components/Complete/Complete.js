import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { getComplete } from '../../actions/complete';

import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';

import useStyles from './styles';

const Holding = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const datas = useSelector((state) => state.complete) // reduecers/index.js의 posts
    // console.log(datas)

    useEffect(() => {
        dispatch(getComplete());
    }, [dispatch]);
    
    return (
      !datas.length ? 
      <div className={classes.root}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>거래 완료 종목</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.heading}>완료된 종목 데이터가 없습니다.</Typography>
          </AccordionDetails>
          </Accordion>
      </div>
       :
      <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>거래 완료 종목</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>종목</TableCell>
              <TableCell align="right">총매수금액&nbsp;(원)</TableCell>
              <TableCell align="right">총매도금액&nbsp;(원)</TableCell>
              <TableCell align="right">처음거래일</TableCell>
              <TableCell align="right">마지막거래일</TableCell>
              <TableCell align="right">수익률&nbsp;(%)</TableCell>
              <TableCell align="right">수익금&nbsp;(원)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map((data) => (
              <TableRow key={data.name}>
                <TableCell component="th" scope="row">
                  {data.name}
                </TableCell>
                <TableCell align="right">{(data.buy_money).toLocaleString()}</TableCell>
                <TableCell align="right">{(data.sell_money).toLocaleString()}</TableCell>
                <TableCell align="right">{data.first_day.substring(0,10)}</TableCell>
                <TableCell align="right">{data.final_day.substring(0,10)}</TableCell>
                <TableCell align="right">{Math.round(((data.sell_money/data.buy_money)-1)* 100)}</TableCell>
                <TableCell align="right">{(data.sell_money - data.buy_money).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </AccordionDetails>
      </Accordion>
    </div>
    )
}

export default Holding