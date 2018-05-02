import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_EXPERT_DETAIL_ACTION,
  GET_LIST_FIELD_ACTION,
  UPDATE_DEGREE_ACTION,
} from './constants';
import { 
  getExpertDetailSuccess,
  getExpertDetailError,
  getListFieldSuccess,
  updateDegreeSuccess,
  updateDegreeError,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetExpertDetail,
  callAPIGetListField,
  callAPIUpdateDegreeExpert,
} from 'utils/request';
import {
  selectIdExpert,
  selectDegree,
  selectPhone,
} from './selectors';

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
export function* getExpertDetail() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdExpert()); 
  const response = yield call(callAPIGetExpertDetail,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
        yield put(getExpertDetailSuccess(response.data.data.data));
    } else {
      message.error(response.data.data.msg);
      yield put(getExpertDetailError());
    }
  } catch(error){
          message.error(response.data.data.e+" Lỗi trong quá trình load dữ liệu");
          yield put(getExpertDetailError());
  }
  
}
export function* getExpertDetailWatcher() {
  while (yield take(GET_EXPERT_DETAIL_ACTION)) {
    yield call(getExpertDetail);
  }
}

export function* updateDegreeExpert() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const phone = yield select(selectPhone()); 
  const degree = yield select(selectDegree()); 
  const response = yield call(callAPIUpdateDegreeExpert,userInfo.phone,userInfo.password,phone,degree);
  try{
    if (response.data.data.e==0) {
        yield put(updateDegreeSuccess(response.data.data.data));
    } else {
      message.error(response.data.data.msg);
      yield put(updateDegreeError());
    }
  } catch(error){
    message.error(response.data.data.e+" Lỗi trong quá trình xử lý");
    yield put(updateDegreeError());
  }
  
}
export function* updateDegreeExpertWatcher() {
  while (yield take(UPDATE_DEGREE_ACTION)) {
    yield call(updateDegreeExpert);
  }
}

export function* defaultSaga() {
  const watchergetExpertDetail = yield fork(getExpertDetailWatcher);
  const watchergetListField = yield fork(getListFieldWatcher);
  const watcherupdateDegreeExpert = yield fork(updateDegreeExpertWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetExpertDetail);
    yield cancel(watchergetListField);
    yield cancel(watcherupdateDegreeExpert);
  }
}

export default [
  defaultSaga,
];
