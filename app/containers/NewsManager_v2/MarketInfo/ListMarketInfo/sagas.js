import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_MK_ACTION,
  GET_LIST_CATE_MK_ACTION,
  DELETE_NEWS_MK_ACTION,
  ADD_NEWS_MK_ACTION,
  UPDATE_TAGS_MK_ACTION,
  UPDATE_IMAGE_NEWS_MK_ACTION,
  UPDATE_NEWS_MK_ACTION,
  GET_COMMENT_NEWS_MK_ACTION,
  DEL_COMMENT_NEWS_MK_ACTION,
} from './constants';
import { 
  getListNewsMKSuccess,
  getListCateNewsMKSuccess,
  deleteNewsMKSuccess,
  addNewsMKSuccess,
  addNewsNotDataMKSuccess,
  getListNewsMKFail,
  addNewsFail,
  deleteNewsMKFail,
  updateTagsSuccess,
  updateTagsFail,
  updateImageMKSuccess,
  updateImageMKFail,
  updateNewsMKSuccess,
  updateNewsMKFail,
  getCommentNewsSuccess,
  getCommentNewsFail,
  delCommentSuccess,
  delCommentFail,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListNewsMKByCate,
  callAPIGetListCategoryNewsMK,
  callAPIDeleteNewsMK,
  callAPIAddNewsMK,
  callAPIUpdateTagsNewsMK,
  callAPIUpdateImageNewsMK,
  callAPIUpdateNewsMK,
  callAPIGetCommentNews,
  callAPIDelCommentNews,
} from 'utils/request';
import {
  selectidCateNewsMK,
  selectPageNews,
  selectIdNewsMKDel,
  selectNewsAddMK,
  selectidNewsMKEdit,
  selectTags,
  selectImageMKUpdate,
  selectNewsMKUpdate,
  selectPageComment,
  selectIdNewsGetComment,
  selectIdCommentDel,
  selectIdNewsToCommentDel,
} from './selectors';

export function* addNewsMK() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const newsAdd = yield select(selectNewsAddMK());
  const response = yield call(callAPIAddNewsMK,userInfo.phone,userInfo.password,newsAdd.get("title"),
      newsAdd.get("author"),newsAdd.get("image"),newsAdd.get("source"),
      newsAdd.get("tags"), newsAdd.get("idcate"), newsAdd.get("content"));
  try{
    if (response.data.data.e==0) {
      if(newsAdd.get("idCateLink")!==newsAdd.get("idcate")){
        yield put(addNewsNotDataMKSuccess(0))
      }else{
        yield put(addNewsMKSuccess(response.data.data.data,0));
      }
      message.success('Thêm tin tức thành công !');
    } else {
      message.error(response.data.data.msg);
      yield put(addNewsFail(response.data.data.e))
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Thêm tin tức lỗi !');
          yield put(addNewsFail(response.data.data.e))
  }
  
}
export function* addNewsMKWatcher() {
  while (yield take(ADD_NEWS_MK_ACTION)) {
    yield call(addNewsMK);
  }
}
export function* deleteNewsMK() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdNewsMKDel());
  const response = yield call(callAPIDeleteNewsMK,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
        yield put(deleteNewsMKSuccess(id));
        message.success('Xóa tin tức thành công !');
    } else {
      message.error(response.data.data.msg);
      yield put(deleteNewsMKFail())
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Xóa tin tức lỗi !');
          yield put(deleteNewsMKFail())
  }
  
}
export function* deleteNewsMKWatcher() {
  while (yield take(DELETE_NEWS_MK_ACTION)) {
    yield call(deleteNewsMK);
  }
}
export function* getListCategoryNewsMK() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const response = yield call(callAPIGetListCategoryNewsMK,userInfo.phone,userInfo.password);
  try{
    if (response.data.data.e==0) {
        yield put(getListCateNewsMKSuccess(response.data.data.array));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi đăng nhập !');
  }
  
}
export function* getListCategoryNewsMKWatcher() {
  while (yield take(GET_LIST_CATE_MK_ACTION)) {
    yield call(getListCategoryNewsMK);
  }
}
export function* getListNewsMK() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidCateNewsMK());
  const page = yield select(selectPageNews());
  const response = yield call(callAPIGetListNewsMKByCate,userInfo.phone,userInfo.password,id,page);
  try{
    if (response.data.data.e==0) {
      yield put(getListNewsMKSuccess(response.data.data.array,response.data.data.total));
    } else {
      message.error(response.data.data.msg);
      yield put(getListNewsMKFail())
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Load danh sách tin tức lỗi !');
          yield put(getListNewsMKFail())
  }
  
}
export function* getListNewsMKWatcher() {
  while (yield take(GET_LIST_MK_ACTION)) {
    yield call(getListNewsMK);
  }
}

export function* updateTagsNewsMK() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidNewsMKEdit());
  const tags = yield select(selectTags());
  const response = yield call(callAPIUpdateTagsNewsMK,userInfo.phone,userInfo.password,tags,id);
  try{
    if (response.data.data.e==0) {
        yield put(updateTagsSuccess(response.data.data.data));
        message.success('Thành công !');
    } else {
      message.error(response.data.data.msg);
      yield put(updateTagsFail())
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Có lỗi trong quá trình xử lý !');
          yield put(updateTagsFail())
  }
  
}
export function* updateTagsNewsMKWatcher() {
  while (yield take(UPDATE_TAGS_MK_ACTION)) {
    yield call(updateTagsNewsMK);
  }
}

export function* updateImageNewsMK() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidNewsMKEdit());
  const image = yield select(selectImageMKUpdate());
  const response = yield call(callAPIUpdateImageNewsMK,userInfo.phone,userInfo.password,image,id);
  try{
    if (response.data.data.e==0) {
        yield put(updateImageMKSuccess(response.data.data.data));
        message.success('Thành công !');
    } else {
      message.error(response.data.data.msg);
      yield put(updateImageMKFail())
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Có lỗi trong quá trình xử lý !');
          yield put(updateImageMKFail())
  }
  
}
export function* updateImageNewsMKWatcher() {
  while (yield take(UPDATE_IMAGE_NEWS_MK_ACTION)) {
    yield call(updateImageNewsMK);
  }
}

export function* updateNewsMK() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const newUpdate = yield select(selectNewsMKUpdate());
  const response = yield call(callAPIUpdateNewsMK,userInfo.phone,userInfo.password,
                                newUpdate.get("idnews"),
                                newUpdate.get("title"),
                                newUpdate.get("author"),
                                newUpdate.get("source"),
                                newUpdate.get("idcate"), 
                                newUpdate.get("content"));
  try{
    if (response.data.data.e==0) {
      yield put(updateNewsMKSuccess(response.data.data.data))
      message.success('Thành công !');
    } else {
      message.error(response.data.data.msg);
      yield put(updateNewsMKFail())
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Có lỗi trong quá trình xử lý');
          yield put(updateNewsMKFail())
  }
  
}
export function* updateNewsMKWatcher() {
  while (yield take(UPDATE_NEWS_MK_ACTION)) {
    yield call(updateNewsMK);
  }
}

export function* getCommentNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdNewsGetComment());
  const page = yield select(selectPageComment());
  const response = yield call(callAPIGetCommentNews,userInfo.phone,userInfo.password,id,page,2);
  try{
    if (response.data.data.e==0) {
      yield put(getCommentNewsSuccess(response.data.data.array,response.data.data.total))
    } else {
      message.error(response.data.data.msg);
      yield put(getCommentNewsFail())
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Có lỗi trong quá trình xử lý');
          yield put(getCommentNewsFail())
  }
  
}
export function* getCommentNewsWatcher() {
  while (yield take(GET_COMMENT_NEWS_MK_ACTION)) {
    yield call(getCommentNews);
  }
}

export function* delCommentMK() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdCommentDel());
  const idNews = yield select(selectIdNewsToCommentDel());
  console.log(id+ "-"+  idNews)
  const response = yield call(callAPIDelCommentNews,userInfo.phone,userInfo.password,id,2);
  try{
    if (response.data.data.e==0) {
      yield put(delCommentSuccess(id,idNews))
    } else {
      message.error(response.data.data.msg);
      yield put(delCommentFail())
    }
  } catch(error){
    message.error(response.data.data.e);
    message.error('Có lỗi trong quá trình xử lý');
    yield put(delCommentFail())
  }
  
}
export function* delCommentMKWatcher() {
  while (yield take(DEL_COMMENT_NEWS_MK_ACTION)) {
    yield call(delCommentMK);
  }
}
export function* defaultSaga() {
  const watchergetListNewsMK = yield fork(getListNewsMKWatcher);
  const watchergetListCategoryNewsMK = yield fork(getListCategoryNewsMKWatcher);
  const watcherdeleteNewsMK = yield fork(deleteNewsMKWatcher);
  const watcheraddNewsMK = yield fork(addNewsMKWatcher);
  const watcherupdateTagsNewsMK = yield fork(updateTagsNewsMKWatcher);
  const watcherupdateImageNewsMK = yield fork(updateImageNewsMKWatcher);
  const watcherupdateNewsMK = yield fork(updateNewsMKWatcher);
  const watchergetCommentNews = yield fork(getCommentNewsWatcher);
  const watcherdelCommentMK = yield fork(delCommentMKWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListNewsMK);
    yield cancel(watchergetListCategoryNewsMK);
    yield cancel(watcherdeleteNewsMK);
    yield cancel(watcheraddNewsMK);
    yield cancel(watcherupdateTagsNewsMK);
    yield cancel(watcherupdateImageNewsMK);
    yield cancel(watcherupdateNewsMK);
    yield cancel(watchergetCommentNews);
    yield cancel(watcherdelCommentMK);
  }
}
export default [
  defaultSaga,
];
