import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_NEWS_ACTION,
  DELETE_NEWS_ACTION,
  ADD_NEWS_ACTION,
  GET_LIST_CATE_ACTION,
  ADD_TAGS_ACTION,
  UPDATE_IMAGE_NEWS_EVENT_ACTION,
  UPDATE_NEWS_EVENT_ACTION,
  GET_COMMENT_NEWS_EVENT_ACTION,
  DEL_COMMENT_NEWS_EVENT_ACTION,
} from './constants';
import { 
  getListNewsSuccess,
  getListCateNewsSuccess,
  deleteNewsSuccess,
  addNewsNotDataSuccess,
  updateTagsSuccess,
  addNewsSuccess,
  getListNewsFail,
  addNewsFail,
  deleteNewsFail,
  updateTagsFail,
  updateImageSuccess,
  updateImageFail,
  updateNewsEventSuccess,
  updateNewsEventFail,
  getCommentNewsSuccess,
  getCommentNewsFail,
  delCommentSuccess,
  delCommentFail,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListNewsByCate,
  callAPIDeleteNews,
  callAPIAddNews,
  callAPIGetListCategoryNews,
  callAPIUpdateTagsNewsEvent,
  callAPIUpdateImageNewsEvent,
  callAPIUpdateNewsEvent,
  callAPIGetCommentNews,
  callAPIDelCommentNews,
} from 'utils/request';
import {
  selectidCateNewsEvent,
  selectPageNewsEvent,
  selectIdNewsEventDel,
  selectNewsAdd,
  selectidNewsEventEdit,
  selectTags,
  selectImageUpdate,
  selectNewsEventUpdate,
  selectPageComment,
  selectIdNewsGetComment,
  selectIdCommentDel,
  selectIdNewsToCommentDel,
} from './selectors';

export function* deleteNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdNewsEventDel());
  const response = yield call(callAPIDeleteNews,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
        yield put(deleteNewsSuccess(id));
        message.success('Xóa tin tức thành công !');
    } else {
      message.error(response.data.data.msg);
      yield put(deleteNewsFail())
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Xóa tin tức lỗi !');
          yield put(deleteNewsFail())
  }
  
}
export function* deleteNewsWatcher() {
  while (yield take(DELETE_NEWS_ACTION)) {
    yield call(deleteNews);
  }
}

export function* getListNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidCateNewsEvent());
  const page = yield select(selectPageNewsEvent());
  const response = yield call(callAPIGetListNewsByCate,userInfo.phone,userInfo.password,id,page);
  try{
    if (response.data.data.e==0) {
      yield put(getListNewsSuccess(response.data.data.array,response.data.data.total));
    } else {
      message.error(response.data.data.msg);
      yield put(getListNewsFail());
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Load danh sách tin tức lỗi !');
          yield put(getListNewsFail());
  }
  
}
export function* getListNewsWatcher() {
  while (yield take(GET_LIST_NEWS_ACTION)) {
    yield call(getListNews);
  }
}

export function* addNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const newsAdd = yield select(selectNewsAdd());
  const response = yield call(callAPIAddNews,userInfo.phone,userInfo.password,newsAdd.get("title"),
      newsAdd.get("shortDesc"),newsAdd.get("author"),newsAdd.get("image"),newsAdd.get("source"),
      newsAdd.get("tags"), newsAdd.get("idcate"), newsAdd.get("content"));
  try{
    if (response.data.data.e==0) {
      if(newsAdd.get("idCateLink")!==newsAdd.get("idcate")){
        yield put(addNewsNotDataSuccess(0))
      }else{
        yield put(addNewsSuccess(response.data.data.data,0));
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
export function* addNewsWatcher() {
  while (yield take(ADD_NEWS_ACTION)) {
    yield call(addNews);
  }
}

export function* getListCategoryNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const response = yield call(callAPIGetListCategoryNews,userInfo.phone,userInfo.password);
  try{
    if (response.data.data.e==0) {
        yield put(getListCateNewsSuccess(response.data.data.array));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
    console.log(er)
          message.error(response.data.data.e);
          message.error('Lấy danh mục tin tức thất bại !');
  }
  
}
export function* getListCategoryNewsWatcher() {
  while (yield take(GET_LIST_CATE_ACTION)) {
    yield call(getListCategoryNews);
  }
}

export function* updateTagsNewsEvent() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidNewsEventEdit());
  const tags = yield select(selectTags());
  const response = yield call(callAPIUpdateTagsNewsEvent,userInfo.phone,userInfo.password,tags,id);
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
export function* updateTagsNewsEventWatcher() {
  while (yield take(ADD_TAGS_ACTION)) {
    yield call(updateTagsNewsEvent);
  }
}

export function* updateImageNewsEvent() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidNewsEventEdit());
  const image = yield select(selectImageUpdate());
  const response = yield call(callAPIUpdateImageNewsEvent,userInfo.phone,userInfo.password,image,id);
  try{
    if (response.data.data.e==0) {
        yield put(updateImageSuccess(response.data.data.data));
        message.success('Thành công !');
    } else {
      message.error(response.data.data.msg);
      yield put(updateImageFail())
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Có lỗi trong quá trình xử lý !');
          yield put(updateImageFail())
  }
  
}
export function* updateImageNewsEventWatcher() {
  while (yield take(UPDATE_IMAGE_NEWS_EVENT_ACTION)) {
    yield call(updateImageNewsEvent);
  }
}

export function* updateNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const newUpdate = yield select(selectNewsEventUpdate());
  const response = yield call(callAPIUpdateNewsEvent,userInfo.phone,userInfo.password,
                                newUpdate.get("idnews"),
                                newUpdate.get("title"),
                                newUpdate.get("shortDesc"),
                                newUpdate.get("author"),
                                newUpdate.get("source"),
                                newUpdate.get("idcate"), 
                                newUpdate.get("content"));
  try{
    if (response.data.data.e==0) {
      yield put(updateNewsEventSuccess(response.data.data.data))
      message.success('Thành công !');
    } else {
      message.error(response.data.data.msg);
      yield put(updateNewsEventFail())
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Có lỗi trong quá trình xử lý');
          yield put(updateNewsEventFail())
  }
  
}
export function* updateNewsWatcher() {
  while (yield take(UPDATE_NEWS_EVENT_ACTION)) {
    yield call(updateNews);
  }
}

export function* getCommentNewsEvent() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdNewsGetComment());
  const page = yield select(selectPageComment());
  const response = yield call(callAPIGetCommentNews,userInfo.phone,userInfo.password,id,page,1);
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
export function* getCommentNewsEventWatcher() {
  while (yield take(GET_COMMENT_NEWS_EVENT_ACTION)) {
    yield call(getCommentNewsEvent);
  }
}

export function* delComment() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdCommentDel());
  const idNews = yield select(selectIdNewsToCommentDel());
  const response = yield call(callAPIDelCommentNews,userInfo.phone,userInfo.password,id,1);
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
export function* delCommentWatcher() {
  while (yield take(DEL_COMMENT_NEWS_EVENT_ACTION)) {
    yield call(delComment);
  }
}

export function* defaultSaga() {
  const watchergetListNews = yield fork(getListNewsWatcher);
  const watcherdeleteNews = yield fork(deleteNewsWatcher);
  const watcheraddNews = yield fork(addNewsWatcher);
  const watchergetListCategoryNews = yield fork(getListCategoryNewsWatcher);
  const watcherupdateTagsNewsEvent = yield fork(updateTagsNewsEventWatcher);
  const watcherupdateImageNewsEvent = yield fork(updateImageNewsEventWatcher);
  const watcherupdateNews = yield fork(updateNewsWatcher);
  const watchergetCommentNewsEvent = yield fork(getCommentNewsEventWatcher);
  const watcherdelComment = yield fork(delCommentWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListNews);
    yield cancel(watcherdeleteNews);
    yield cancel(watcheraddNews);
    yield cancel(watchergetListCategoryNews);
    yield cancel(watcherupdateTagsNewsEvent);
    yield cancel(watcherupdateImageNewsEvent);
    yield cancel(watcherupdateNews);
    yield cancel(watchergetCommentNewsEvent);
    yield cancel(watcherdelComment);
  }
}

export default [
  defaultSaga,
];
