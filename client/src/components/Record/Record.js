import * as React from 'react';
import { useState } from 'react';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import SyncTwoToneIcon from '@material-ui/icons/SyncTwoTone';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';


import { useDispatch } from 'react-redux';

import useStyles from './styles';
import {createDiary} from '../../actions/posts';
import {getCurrent} from '../../actions/current';
import { format } from 'date-fns';

const Record = () => {

  const [postData, setPostData] = useState({
    "종목명" : '',
    "종목형태": '',
    "매매형태": '',
    "매매단가": '',
    "매매수량": '',
    "매매금액": '',
    "매매일자": new Date(),
  })

  const clear = () => {
    setPostData({
      "종목명" : '',
      "종목형태": '',
      "매매형태": '',
      "매매단가": '',
      "매매수량": '',
      "매매금액": '',
      "매매일자": new Date(),
    })
  }

  const dispatch = useDispatch();

  const classes = useStyles();

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createDiary(postData));
      console.log(postData)
      clear()
    }

    const handleChange = (e) => {
      e.preventDefault();
      dispatch(getCurrent());
    }

  return (
    <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="종목명" 
        value={postData.종목명}
        onChange={(e) => setPostData({
          ...postData,
          '종목명': e.target.value
        })}
        />
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">종목형태</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={postData.종목형태}
          onChange={(e) => setPostData({
            ...postData,
            '종목형태': e.target.value
          })}
          label="종목형태"
        >
          <MenuItem value={"코스피"}>코스피</MenuItem>
          <MenuItem value={"코스닥"}>코스닥</MenuItem>
          <MenuItem value={"코인"}>코인</MenuItem>
        </Select>
      </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">매매형태</InputLabel>
          <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={postData.매매형태}
          onChange={(e) => setPostData({
            ...postData,
            '매매형태': e.target.value
          })}
          label="매매형태" 
          >
            <MenuItem value={"매수"}>매수</MenuItem>
            <MenuItem value={"매도"}>매도</MenuItem>
          </Select>
        </FormControl>
        <TextField id="standard-basic" label="매매단가" 
          value={postData.매매단가}
          onChange={(e) => setPostData({
            ...postData,
            '매매단가': Number(e.target.value)
          })}
        />
        <TextField id="standard-basic" label="매매수량" 
          value={postData.매매수량}
          type='number'
          onChange={(e) => setPostData({
            ...postData,
            '매매수량': Number(e.target.value)
          })}
        />
        <TextField id="standard-basic" label="매매금액" 
          value={postData.매매금액}
          onChange={(e) => setPostData({
            ...postData,
            '매매금액': Number(e.target.value)
          })}
        />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="매매일자"
            format="yyyy/MM/dd"
            value={postData.매매일자}
            onChange={(e) => setPostData({
              ...postData,
              '매매일자': format(new Date(e), 'yyyy/MM/dd')
            })}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={handleSubmit}
        >
          <KeyboardArrowRightIcon fontSize="small" /> 등록
        </Button>
        <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SyncTwoToneIcon />}
        onClick={handleChange}
        >
        보유 종목 확인
        </Button>
      </form>
  );
}

export default Record
