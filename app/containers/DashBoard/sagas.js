import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_DASHBOARD_ACTION,
} from './constants';
import { 
  getDashBoardSuccess,
  getDashBoardFail,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetDashBoard,
} from 'utils/request';
import {

} from './selectors';

export function* getDashBoard() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const response = yield call(callAPIGetDashBoard,userInfo.phone,userInfo.password);
  try{
    if (response.data.data.e==0) {
      let numExpert = response.data.data.data.numExpert;
      let numQA = response.data.data.data.numQA;
      let numUser = response.data.data.data.numUser;
      let numFRQS = response.data.data.data.numQuestionFR;
      let reportFRQSByDay = JSON.parse(response.data.data.data.forumByDay);
      let startTime = response.data.data.data.startTime;
      let endTime = response.data.data.data.endTime;

      let tempReportExpert = JSON.parse(response.data.data.data.expertByField);
      let reportExpert = [];
      tempReportExpert.map((item,index)=>{
        reportExpert.push({name: item.name, value: item.value})
      });

      let tempReportQA = JSON.parse(response.data.data.data.qaByField);
      let reportQA = [];
      tempReportQA.map((item,index)=>{
        reportQA.push({name: item.name, value: item.value})
      });

      let tempReportFRQS = JSON.parse(response.data.data.data.frByField);
      let reportFRQS = [];
      tempReportFRQS.map((item,index)=>{
        reportFRQS.push({name: item.name, value: item.value})
      });

      yield put(getDashBoardSuccess(numExpert,reportExpert,numUser,numQA,reportQA,numFRQS,reportFRQS,reportFRQSByDay,startTime,endTime));
    } else {
      message.error(response.data.data.msg);
      yield put(getDashBoardFail());
    }
  } catch(error){
    message.error(response.data.data.e+" Lỗi trong quá trình xử lý");
    yield put(getDashBoardFail());
  }
  
}
export function* getDashBoardWatcher() {
  while (yield take(GET_DASHBOARD_ACTION)) {
    yield call(getDashBoard);
  }
}

export function* defaultSaga() {
  const watchergetDashBoard = yield fork(getDashBoardWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetDashBoard);
  }
}

export default [
  defaultSaga,
];
