import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import {createDiary} from '../../actions/posts';
import { createCurrent, updateCurrent} from '../../actions/current';
import { format } from 'date-fns';

const Record = ({currentId, setCurrentId}) => {
  const [open, setOpen] = React.useState(false);

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
      setCurrentId(null);
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
    // console.log('currentId', currentId)
  const post = useSelector((state) => (currentId ? state.current.find((message) => message === currentId[0]) : null));
    // console.log('postData', postData)
    // console.log('post', post)

  useEffect(() => {
    if(post) setPostData({
      "종목명" : post.NAME,
      "종목형태": post.VALUE,
      "매매형태": currentId[1],
      "매매단가": '',
      "매매수량": '',
      "매매금액": '',
      "매매일자": new Date(),
      });
    }, [currentId, post]);
      
  const classes = useStyles();
      
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!postData.종목명 || !postData.종목형태 || !postData.매매형태 || !postData.매매단가 || !postData.매매수량 || !postData.매매금액){
      alert('입력을 모두 해주세요')
    } else {
      dispatch(createCurrent(postData));
      dispatch(createDiary(postData));
      // console.log(createCurrent(postData))
      handleClose();
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    if(!postData.종목명 || !postData.종목형태 || !postData.매매형태 || !postData.매매단가 || !postData.매매수량 || !postData.매매금액){
      alert('입력을 모두 해주세요')
    } else {
      dispatch(createDiary(postData));
      dispatch(updateCurrent(postData));
      // console.log(postData)
      handleClose();
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    clear();
    setOpen(false);
  };

  return (
    <div>
      <Fab color="primary" className={classes.fab} onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
        <Dialog open={post ? true : open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{post ? '수정' : '등록'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              데이터를 입력해 주세요.
            </DialogContentText>
            <div className={classes.root}>
              <TextField
                id="standard-basic"
                label="종목명"
                value={postData.종목명 || ''}
                onChange={(e) => setPostData({
                  ...postData,
                  '종목명': e.target.value
                })}
              />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">종목형태</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={postData.종목형태 || ''}
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
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">매매형태</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={postData.매매형태 || ''}
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
              <TextField
                id="standard-basic"
                label="매매단가"
                value={postData.매매단가 || ''}
                onChange={(e) => setPostData({
                  ...postData,
                  '매매단가': Number(e.target.value)
                })}
              />
              <TextField
                id="standard-basic"
                label="매매수량"
                value={postData.매매수량 || ''}
                onChange={(e) => setPostData({
                  ...postData,
                  '매매수량': Number(e.target.value)
                })}
              />
              <TextField
                id="standard-basic"
                label="매매금액"
                value={postData.매매금액 || ''}
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
                    '매매일자': format(new Date(e), 'yyyy/MM/dd 12:00:00')
                  })}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              취소
            </Button>
            <Button onClick={post ? handleUpdate : handleSubmit} color="primary">
              등록
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}

export default Record
