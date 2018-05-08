import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_CATE_AGRI_TECH_ACTION,
  ADD_CATE_AGRI_TECH_ACTION,
  DEL_CATE_AGRI_TECH_ACTION,
} from './constants';
import { 
  getListCateAgriTechSuccess,
  addCateAgriTechSuccess,
  delCateAgriTechSuccess,
  getListCateAgriTechFail,
  delCateAgriTechFail,
  addCateAgriTechFail,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListCateAgriTech,
  callAPIAddCateAgriTech,
  callAPIDelCateAgriTech,
} from 'utils/request';
import {
  selectNameCateAgriTechAdd,
  selectIdDelCate,
} from './selectors';

export function* getListCateAgriTech() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const response = yield call(callAPIGetListCateAgriTech,userInfo.phone,userInfo.password);
  try{
    if (response.data.data.e==0) {
        yield put(getListCateAgriTechSuccess(response.data.data.array));
    } else {
      message.error(response.data.data.msg);
      yield put(getListCateAgriTechFail())
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi đăng nhập !');
          yield put(getListCateAgriTechFail())
  }
  
}
export function* getListCateAgriTechWatcher() {
  while (yield take(GET_LIST_CATE_AGRI_TECH_ACTION)) {
    yield call(getListCateAgriTech);
  }
}

export function* addCateAgriTech() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const name = yield select(selectNameCateAgriTechAdd()); 
  const response = yield call(callAPIAddCateAgriTech,userInfo.phone,userInfo.password,name);
  try{
    if (response.data.data.e==0) {
        yield put(addCateAgriTechSuccess(response.data.data.data));
        message.success("Thêm thành công.");
    } else {
      message.error(response.data.data.msg);
      yield put(addCateAgriTechFail())
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi trong quá trình thêm!');
          yield put(addCateAgriTechFail())
  }
  
}
export function* addCateAgriTechWatcher() {
  while (yield take(ADD_CATE_AGRI_TECH_ACTION)) {
    yield call(addCateAgriTech);
  }
}

export function* delCateAgritech() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdDelCate()); 
  const response = yield call(callAPIDelCateAgriTech,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
        yield put(delCateAgriTechSuccess(id));
        message.success("Xóa thành công.");
    } else {
      message.error(response.data.data.msg);
      yield put(delCateAgriTechFail())
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi trong quá trình xử lý!');
          yield put(delCateAgriTechFail())
  }
  
}
export function* delCateAgritechWatcher() {
  while (yield take(DEL_CATE_AGRI_TECH_ACTION)) {
    yield call(delCateAgritech);
  }
}

export function* defaultSaga() {
  const watchergetListCateAgriTech = yield fork(getListCateAgriTechWatcher);
  const watcheraddCateAgriTech = yield fork(addCateAgriTechWatcher);
  const watcherdelCateAgritech = yield fork(delCateAgritechWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListCateAgriTech);
    yield cancel(watcheraddCateAgriTech);
    yield cancel(watcherdelCateAgritech);
  }
}
export default [
  defaultSaga,
];
