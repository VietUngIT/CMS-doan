import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_FIELD_ACTION,
  GET_LIST_QA_ACTION,
} from './constants';
import { 
  getListFieldSuccess,
  getListQASuccess,
  getListQAFail,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListField,
  callAPIGetListQA,
} from 'utils/request';
import {
  selectIdField,
  selectPage,
} from './selectors';

export function* getListQA() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdField()); 
  const page = yield select(selectPage()); 
  const response = yield call(callAPIGetListQA,userInfo.phone,userInfo.password,id,page);
  try{
    if (response.data.data.e==0) {
        yield put(getListQASuccess(response.data.data.data,response.data.data.total));
    } else {
      message.error(response.data.data.msg);
      yield put(getListQAFail());
    }
  } catch(error){
          message.error(response.data.data.e+" Lỗi trong quá trình load dữ liệu");
          yield put(getListQAFail());
  }
  
}
export function* getListQAWatcher() {
  while (yield take(GET_LIST_QA_ACTION)) {
    yield call(getListQA);
  }
}

export function* getListField() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const response = yield call(callAPIGetListField,userInfo.phone,userInfo.password);
  try{
    if (response.data.data.e==0) {
        yield put(getListFieldSuccess(response.data.data.array));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lấy thông tin lỗi !');
  }
  
}
export function* getListFieldWatcher() {
  while (yield take(GET_LIST_FIELD_ACTION)) {
    yield call(getListField);
  }
}

export function* defaultSaga() {
  const watchergetListField = yield fork(getListFieldWatcher);
  const watchergetListQA = yield fork(getListQAWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListField);
    yield cancel(watchergetListQA);
  }
}
export default [
  defaultSaga,
];
