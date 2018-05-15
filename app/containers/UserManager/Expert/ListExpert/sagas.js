import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_FIELD_ACTION,
  ADD_LIST_FIELD_ACTION,
  DELETE_LIST_FIELD_ACTION,
} from './constants';
import { 
  getListFieldSuccess,
  addFieldSuccess,
  delFieldSuccess,
  getListFieldFail,
  delFieldFail,
  addFieldFail,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListField,
  callAPIDelField,
  callAPIAddField,
} from 'utils/request';
import {
  selectNameFieldAdd,
  selectIdDelField,
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
      yield put(getListFieldFail());
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lấy thông tin lỗi !');
          yield put(getListFieldFail());
  }
  
}
export function* getListFieldWatcher() {
  while (yield take(GET_LIST_FIELD_ACTION)) {
    yield call(getListField);
  }
}

export function* addField() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const name = yield select(selectNameFieldAdd()); 
  const response = yield call(callAPIAddField,userInfo.phone,userInfo.password,name);
  try{
    if (response.data.data.e==0) {
        yield put(addFieldSuccess(response.data.data.data,0));
        message.success("Thêm thành công.");
    } else {
      message.error(response.data.data.msg);
      yield put(addFieldFail());
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi trong quá trình thêm!');
          yield put(addFieldFail());
  }
  
}
export function* addFieldWatcher() {
  while (yield take(ADD_LIST_FIELD_ACTION)) {
    yield call(addField);
  }
}

export function* delField() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdDelField()); 
  const response = yield call(callAPIDelField,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
        yield put(delFieldSuccess(id));
        message.success("Xóa thành công.");
    } else {
      message.error(response.data.data.msg);
      yield put(delFieldFail());
    }
  } catch(error){
    message.error(response.data.data.e);
    message.error('Lỗi trong quá trình xử lý!');
    yield put(delFieldFail());
  }
  
}
export function* delFieldWatcher() {
  while (yield take(DELETE_LIST_FIELD_ACTION)) {
    yield call(delField);
  }
}

export function* defaultSaga() {
  const watchergetListField = yield fork(getListFieldWatcher);
  const watcheraddField = yield fork(addFieldWatcher);
  const watcherdelField = yield fork(delFieldWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListField);
    yield cancel(watcheraddField);
    yield cancel(watcherdelField);
  }
}
export default [
  defaultSaga,
];
