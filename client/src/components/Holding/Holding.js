import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import useStyles from './styles';

function createData(name, calories, fat, carbs, protein, day1, day2) {
    return { name, calories, fat, carbs, protein, day1, day2 };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, '20-10-11', '21-10-11'),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, '20-10-11', '21-10-11'),
    createData('Eclair', 262, 16.0, 24, 6.0, '20-10-11', '21-10-11'),
    createData('Cupcake', 305, 3.7, 67, 4.3, '20-10-11', '21-10-11'),
    createData('Gingerbread', 356, 16.0, 49, 3.9, '20-10-11', '21-10-11'),
    createData('Gingerbread', 356, 16.0, 49, 3.9, '20-10-11', '21-10-11'),
    createData('Gingerbread', 356, 16.0, 49, 3.9, '20-10-11', '21-10-11'),
  ];


const Holding = () => {
    const classes = useStyles();
    
    return (
        <TableContainer component={Paper}>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>현재 보유 목록</Paper>
        </Grid>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>종목</TableCell>
              <TableCell align="right">보유수량</TableCell>
              <TableCell align="right">투자금액&nbsp;(원)</TableCell>
              <TableCell align="right">매수금액&nbsp;(원)</TableCell>
              <TableCell align="right">매도금액&nbsp;(원)</TableCell>
              <TableCell align="right">최초투자일시</TableCell>
              <TableCell align="right">최근투자일시</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.day1}</TableCell>
                <TableCell align="right">{row.day2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default Holding
