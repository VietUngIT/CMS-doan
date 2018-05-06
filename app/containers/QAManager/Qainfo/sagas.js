import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_FIELD_ACTION,
  GET_LIST_QA_ACTION,
  ADD_QA_ACTION,
  DELETE_QA_ACTION,
  EDIT_QA_ACTION,
} from './constants';
import { 
  getListFieldSuccess,
  getListQASuccess,
  getListQAFail,
  addQAFail,
  addQASuccess,
  addQANoDataSuccess,
  delQASuccess,
  delQAFail,
  editQASuccess,
  editQAFail,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListField,
  callAPIGetListQA,
  callAPIAddQA,
  callAPIDelQA,
  callAPIEditQA,
} from 'utils/request';
import {
  selectIdField,
  selectPage,
  selectQAAdd,
  selectIdQADel,
  selectQAEdit,
} from './selectors';

export function* editQA() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const qaEdit = yield select(selectQAEdit());
  const response = yield call(callAPIEditQA,userInfo.phone,userInfo.password,
                              qaEdit.get("id"),
                              qaEdit.get("question"),
                              qaEdit.get("title"),
                              qaEdit.get("answer"));
  try{
    if (response.data.data.e==0) {
      yield put(editQASuccess(response.data.data.data,0));
      message.success('Sửa Q&A thành công !');
    } else {
      message.error(response.data.data.msg);
      yield put(editQAFail(response.data.data.e))
    }
  } catch(error){
          message.error(response.data.data.e+": thêm Q&A lỗi");
          yield put(editQAFail(response.data.data.e))
  }
  
}
export function* editQAWatcher() {
  while (yield take(EDIT_QA_ACTION)) {
    yield call(editQA);
  }
}

export function* delQA() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdQADel());
  const response = yield call(callAPIDelQA,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
      yield put(delQASuccess(id));
      message.success('Xóa Q&A thành công !');
    } else {
      message.error(response.data.data.msg);
      yield put(delQAFail())
    }
  } catch(error){
    message.error(response.data.data.e+": xóa Q&A lỗi");
    yield put(delQAFail())
  }
  
}
export function* delQAWatcher() {
  while (yield take(DELETE_QA_ACTION)) {
    yield call(delQA);
  }
}
export function* addQA() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const qaAdd = yield select(selectQAAdd());
  const response = yield call(callAPIAddQA,userInfo.phone,userInfo.password,
                              qaAdd.get("idField"),
                              qaAdd.get("question"),
                              qaAdd.get("title"),
                              qaAdd.get("answer"));
  try{
    if (response.data.data.e==0) {
      if(qaAdd.get("idFieldSelect")!==qaAdd.get("idField")){
        yield put(addQANoDataSuccess(0))
      }else{
        yield put(addQASuccess(response.data.data.data,0));
      }
      message.success('Thêm Q&A thành công !');
    } else {
      message.error(response.data.data.msg);
      yield put(addQAFail(response.data.data.e))
    }
  } catch(error){
          message.error(response.data.data.e+": thêm Q&A lỗi");
          yield put(addQAFail(response.data.data.e))
  }
  
}
export function* addQAWatcher() {
  while (yield take(ADD_QA_ACTION)) {
    yield call(addQA);
  }
}

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
        yield put(getListQASuccess(response.data.data.array,response.data.data.total));
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
  const watcheraddQA = yield fork(addQAWatcher);
  const watcherdelQA = yield fork(delQAWatcher);
  const watchereditQA = yield fork(editQAWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListField);
    yield cancel(watchergetListQA);
    yield cancel(watcheraddQA);
    yield cancel(watcherdelQA);
    yield cancel(watchereditQA);
  }
}
export default [
  defaultSaga,
];
