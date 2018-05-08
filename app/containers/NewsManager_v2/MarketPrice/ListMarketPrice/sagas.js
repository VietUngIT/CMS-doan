import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_MP_ACTION,
  DEL_LIST_MP_ACTION,
  ADD_LIST_MP_ACTION,
} from './constants';
import { 
  getListMPSuccess,
  deleteNewsMPSuccess,
  addNewsMPSuccess,
  addNewsMPFail,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListNewsMP,
  callAPIDellNewsMP,
  callAPIAddNewsMP,
} from 'utils/request';
import {
  selectIdCateGetListMP,
  selectPageGetListMP,
  selectIdNewsMPDel,
  selectNewsAdd,
} from './selectors';
import {
  setLoading,
} from '../CateMarketPrice/actions';

export function* deleteNewsMP() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdNewsMPDel());
  const response = yield call(callAPIDellNewsMP,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
        yield put(deleteNewsMPSuccess(id));
        message.success('Xóa tin tức thành công !');
    } else {
      message.error(response.data.data.msg);
    }
    yield put(setLoading(false))
  } catch(error){
          message.error(response.data.data.e);
          message.error('Xóa tin tức lỗi !');
          yield put(setLoading(false))
  }
  
}
export function* deleteNewsMPWatcher() {
  while (yield take(DEL_LIST_MP_ACTION)) {
    yield call(deleteNewsMP);
  }
}
export function* getListNewsMP() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdCateGetListMP());
  const page = yield select(selectPageGetListMP());
  const response = yield call(callAPIGetListNewsMP,userInfo.phone,userInfo.password,id,page);
  try{
    if (response.data.data.e==0) {
      yield put(getListMPSuccess(response.data.data.array,response.data.data.total));
    } else {
      message.error(response.data.data.msg);
    }
    yield put(setLoading(false))
  } catch(error){
    message.error(response.data.data.e);
    message.error('Load danh sách tin tức lỗi !');
    yield put(setLoading(false))
  }
  
}
export function* getListNewsMPWatcher() {
  while (yield take(GET_LIST_MP_ACTION)) {
    yield call(getListNewsMP);
  }
}

export function* addNewsMP() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const newsAdd = yield select(selectNewsAdd());
  const response = yield call(callAPIAddNewsMP,userInfo.phone,userInfo.password,newsAdd.get("idCate"),
      newsAdd.get("name"),newsAdd.get("price"),newsAdd.get("unit"),newsAdd.get("place"),
      newsAdd.get("note"));
  try{
    if (response.data.data.e==0) {
      yield put(addNewsMPSuccess(response.data.data.data,0));
      message.success('Thêm tin tức thành công !');
    } else {
      message.error(response.data.data.msg);
      yield put(addNewsMPFail(response.data.data.e))
    }
    yield put(setLoading(false))
  } catch(error){
          message.error(response.data.data.e);
          message.error('Thêm tin tức lỗi !');
          yield put(addNewsMPFail(response.data.data.e))
          yield put(setLoading(false))
  }
  
}
export function* addNewsMPWatcher() {
  while (yield take(ADD_LIST_MP_ACTION)) {
    yield call(addNewsMP);
  }
}

export function* defaultSaga() {
  const watchergetListNewsMP = yield fork(getListNewsMPWatcher);
  const watcherdeleteNewsMP = yield fork(deleteNewsMPWatcher);
  const watcheraddNewsMP = yield fork(addNewsMPWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListNewsMP);
    yield cancel(watcherdeleteNewsMP);
    yield cancel(watcheraddNewsMP);
  }
}
export default [
  defaultSaga,
];
