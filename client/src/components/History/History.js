import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';
import { getDiary } from '../../actions/posts';

import { useSelector, useDispatch } from 'react-redux';

const columns = [
    { id: 'ID', label: '번호', minWidth: 25 },
    { id: '종목명', label: '종목명', minWidth: 85 },
    {
      id: '종목형태',
      label: '종목형태',
      minWidth: 85,
    },
    {
      id: '매매형태',
      label: '매매형태',
      minWidth: 85,
    },
    {
      id: '매매단가',
      label: '매매단가(원)',
      minWidth: 85,
      format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: '매매수량',
        label: '매매수량(개)',
        minWidth: 85,
        format: (value) => value.toLocaleString('en-US'),
      },
      {
        id: '매매금액',
        label: '매매금액(원)',
        minWidth: 85,
        format: (value) => value.toLocaleString('en-US'),
      },
      {
        id: '매매일자',
        label: '매매일자',
        minWidth: 85,
        // format: (value) => value.substring(0,10)
      },
  ];

const History = () => {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    const data = useSelector((state) => state.posts) // reduecers/index.js의 posts
    // console.log(data)

    useEffect(() => {
        dispatch(getDiary());
    }, [dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
      !data.length ? <div>기록데이터 없음</div> :
      <Paper className={classes.root}>
      <Typography className={classes.heading}>매매일지</Typography>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.ID}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    )
}

export default History