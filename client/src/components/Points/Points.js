import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {useStyles, StyledTableCell, StyledTableRow} from './styles.js';
import Typography from '@material-ui/core/Typography';

import { getPoints } from '../../actions/points';

import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';

const Points = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const datas = useSelector((state) => state.points) 
    
    console.log(datas)

    useEffect(() => {
        dispatch(getPoints());
    }, [dispatch]);

    let cnt = 0;
    
    return (
    //   !datas.length ? <Typography>완료된 종목 데이터가 없습니다.</Typography> :
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>날짜</StyledTableCell>
              <StyledTableCell align="right">지수</StyledTableCell>
              <StyledTableCell align="right">변동량</StyledTableCell>
              <StyledTableCell align="right">변동율</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map((data) => (
              <StyledTableRow key={data.id}>
                <StyledTableCell component="th" scope="row">
                  {data.day}
                </StyledTableCell>
                <StyledTableCell align="right">{data.point}</StyledTableCell>
                <StyledTableCell align="right">{data.count}</StyledTableCell>
                <StyledTableCell align="right">{data.rate}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default Points;