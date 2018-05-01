import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_EXPERT_ACTION,
  ADD_EXPERT_ACTION,
} from './constants';
import { 
  getListExpertSuccess,
  addExpertSuccess,
  addExpertNotDataSuccess,
  getListExpertError,
  addExpertError,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListExpert,
  callAPIAddExpert,
} from 'utils/request';
import {
  selectPageListExpert,
  selectidFieldGetExpert,
  selectExpertAdd,
} from './selectors';


export function* addExpert() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const expertAdd = yield select(selectExpertAdd());
  const response = yield call(callAPIAddExpert,userInfo.phone,userInfo.password,
                                expertAdd.get("name"),
                                expertAdd.get("phone"),
                                expertAdd.get("desc"),
                                expertAdd.get("email"),
                                expertAdd.get("address"),
                                expertAdd.get("workplace"), 
                                expertAdd.get("idfield"), 
                                expertAdd.get("lat"),
                                expertAdd.get("long"),
                                expertAdd.get("tags"),
                                expertAdd.get("degree"));
  try{
    if (response.data.data.e==0) {
      if(expertAdd.get("idfieldcurrent")!==expertAdd.get("idfield")){
        yield put(addExpertNotDataSuccess(0))
      }else{
        yield put(addExpertSuccess(response.data.data.data,0));
      }
      message.success('Thêm chuyên gia thành công !');
    } else {
      message.error(response.data.data.msg);
      yield put(addExpertError(response.data.data.e))
    }
  } catch(error){
          message.error(response.data.data.e+": thêm chuyên gia lỗi");
          yield put(addExpertError(response.data.data.e))
  }
  
}
export function* addExpertWatcher() {
  while (yield take(ADD_EXPERT_ACTION)) {
    yield call(addExpert);
  }
}
export function* getListExpert() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidFieldGetExpert()); 
  const page = yield select(selectPageListExpert()); 
  const response = yield call(callAPIGetListExpert,userInfo.phone,userInfo.password,id,page);
  try{
    if (response.data.data.e==0) {
        yield put(getListExpertSuccess(response.data.data.array,response.data.data.total));
    } else {
      message.error(response.data.data.msg);
      yield put(getListExpertError())
    }
  } catch(error){
          message.error(response.data.data.e);
          yield put(getListExpertError())
          message.error('Lấy thông tin lỗi !');
  }
  
}
export function* getListExpertWatcher() {
  while (yield take(GET_LIST_EXPERT_ACTION)) {
    yield call(getListExpert);
  }
}

export function* defaultSaga() {
  const watchergetListExpert = yield fork(getListExpertWatcher);
  const watcheraddExpert = yield fork(addExpertWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListExpert);
    yield cancel(watcheraddExpert);
  }
}
export default [
  defaultSaga,
];
