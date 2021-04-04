import * as React from 'react';
import { useState, useEffect } from 'react';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import {createDiary} from '../../actions/posts';

const Record = () => {

  const [postData, setPostData] = useState({
    "종목명" : '',
    "종목형태": '',
    "매매형태": '',
    "매매단가": '',
    "매매수량": '',
    "매매금액": '',
    "매매일자": '',
  })

  const clear = () => {
    setPostData({
      "종목명" : '',
      "종목형태": '',
      "매매형태": '',
      "매매단가": '',
      "매매수량": '',
      "매매금액": '',
      "매매일자": '',
    })
  }

  const dispatch = useDispatch();

    const classes = useStyles();

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createDiary(postData));
      clear()
    }

  return (
    <div className={classes.root}>
      <FormGroup className="MuiFormGroup-options" row >
        <TextField id="standard-basic" label="종목명" 
        value={postData.종목명}
        onChange={(e) => setPostData({
          ...postData,
          '종목명': e.target.value
        })}
        />
        <FormControl>
          <InputLabel>종목형태</InputLabel>
          <Select onChange={(e) => setPostData({
            ...postData,
            '종목형태': e.target.value
          })}>
            <MenuItem value="코스피">코스피</MenuItem>
            <MenuItem value="코스닥">코스닥</MenuItem>
            <MenuItem value="코인">코인</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>매매형태</InputLabel>
          <Select onChange={(e) => setPostData({
            ...postData,
            '매매형태': e.target.value
          })}>
            <MenuItem value="매수">매수</MenuItem>
            <MenuItem value="매도">매도</MenuItem>
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
        <TextField id="standard-basic" label="매매일자" 
          value={postData.매매일자}
          onChange={(e) => setPostData({
            ...postData,
            '매매일자': e.target.value
          })}
        />
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={handleSubmit}
        >
          <KeyboardArrowRightIcon fontSize="small" /> 등록
        </Button>
      </FormGroup>
    </div>
  );
}

export default Record
