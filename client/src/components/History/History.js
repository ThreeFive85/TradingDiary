import React, { useEffect, useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import {useStyles, StyledTableCell, StyledTableRow } from './styles.js';
import { getDiary, getStock } from '../../actions/posts';

import { useSelector, useDispatch } from 'react-redux';

const History = () => {

    const [searchData, setSearchData] = useState({
      "name" : '',
    })

    const classes = useStyles();
    
    const dispatch = useDispatch();

    const data = useSelector((state) => state.posts) // reduecers/index.js의 posts
    // console.log(data)

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(getStock(searchData.name));
      // console.log(searchData)
      setSearchData({
        "name" : '',
      })
    }

    let cnt = 0;

    useEffect(() => {
        dispatch(getDiary());
    }, [dispatch]);

    return (
      !data.length ? <div>기록데이터 없음</div> : 
      
      <><Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Search Stock Name"
            inputProps={{ 'aria-label': 'search stock name' }}
            onChange={(e)=> setSearchData({...searchData, 'name': e.target.value})}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={handleSubmit}>
            <SearchIcon />
          </IconButton>
        </Paper>
        {/* 테이블 */}
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>번호</StyledTableCell>
                  <StyledTableCell align="right">종목명</StyledTableCell>
                  <StyledTableCell align="right">종목형태</StyledTableCell>
                  <StyledTableCell align="right">매매형태</StyledTableCell>
                  <StyledTableCell align="right">매매단가&nbsp;(원)</StyledTableCell>
                  <StyledTableCell align="right">매매수량</StyledTableCell>
                  <StyledTableCell align="right">매매금액&nbsp;(원)</StyledTableCell>
                  <StyledTableCell align="right">매매일자</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {cnt += 1}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.종목명}</StyledTableCell>
                    <StyledTableCell align="right">{row.종목형태}</StyledTableCell>
                    <StyledTableCell align="right">{row.매매형태}</StyledTableCell>
                    <StyledTableCell align="right">{row.매매단가.toLocaleString('en-US')}</StyledTableCell>
                    <StyledTableCell align="right">{row.매매수량}</StyledTableCell>
                    <StyledTableCell align="right">{row.매매금액.toLocaleString('en-US')}</StyledTableCell>
                    <StyledTableCell align="right">{row.매매일자.substring(0, 10)}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer></>
  );
    
}

export default History