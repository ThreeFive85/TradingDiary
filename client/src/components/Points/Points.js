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
    // console.log(datas)
    
    useEffect(() => {
        dispatch(getPoints());
    }, [dispatch]);
    
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="cn">날짜</StyledTableCell>
              <StyledTableCell align="cn">코스피/코스닥</StyledTableCell>
              <StyledTableCell align="cn">지수</StyledTableCell>
              <StyledTableCell align="cn">변동량</StyledTableCell>
              <StyledTableCell align="cn">변동율</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map((data) => (
              <StyledTableRow key={data.id}>
                <StyledTableCell component="th" scope="row">
                  {data.day+'('+data.date+')'}
                </StyledTableCell>
                <StyledTableCell align="cn">
                    <Typography>코스피</Typography>
                    <br/>
                    <Typography>코스닥</Typography>
                </StyledTableCell>
                <StyledTableCell align="cn">
                    {parseFloat(data.rate.split(' ')[0]) > 0 ? 
                        <Typography color="secondary">{data.point.split(' ')[0].toLocaleString()}</Typography> : 
                        <Typography color="primary">{data.point.split(' ')[0].toLocaleString()}</Typography>
                    }
                    <br/>
                    {parseFloat(data.rate.split(' ')[1]) > 0 ? 
                        <Typography color="secondary">{data.point.split(' ')[1].toLocaleString()}</Typography> : 
                        <Typography color="primary">{data.point.split(' ')[1].toLocaleString()}</Typography>
                    }
                </StyledTableCell>
                <StyledTableCell align="cn">
                    {parseFloat(data.rate.split(' ')[0]) > 0 ? 
                        <Typography color="secondary">{data.count.split(' ')[0].toLocaleString()}</Typography> : 
                        <Typography color="primary">{data.count.split(' ')[0].toLocaleString()}</Typography>
                    }
                    <br/>
                    {parseFloat(data.rate.split(' ')[1]) > 0 ? 
                        <Typography color="secondary">{data.count.split(' ')[1].toLocaleString()}</Typography> : 
                        <Typography color="primary">{data.count.split(' ')[1].toLocaleString()}</Typography>
                    }
                </StyledTableCell>
                <StyledTableCell align="cn">
                    {parseFloat(data.rate.split(' ')[0]) > 0 ? 
                        <Typography color="secondary">{data.rate.split(' ')[0].toLocaleString()+'%'}</Typography> : 
                        <Typography color="primary">{data.rate.split(' ')[0].toLocaleString()+'%'}</Typography>
                    }
                    <br/>
                    {parseFloat(data.rate.split(' ')[1]) > 0 ? 
                        <Typography color="secondary">{data.rate.split(' ')[1].toLocaleString()+'%'}</Typography> : 
                        <Typography color="primary">{data.rate.split(' ')[1].toLocaleString()+'%'}</Typography>
                    }
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default Points;