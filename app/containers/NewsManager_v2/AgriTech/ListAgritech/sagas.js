import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_AGRI_TECH_ACTION,
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION,
  GET_LIST_CATE_AGRI_TECH_ACTION,
  DELETE_NEWS_AGRI_TECH_ACTION,
  ADD_NEWS_AGRI_TECH_ACTION,
  UPDATE_TAGS_AG_ACTION,
  UPDATE_IMAGE_NEWS_AG_ACTION,
  UPDATE_NEWS_AG_ACTION,
} from './constants';
import { 
  getListNewsAgriTechSuccess,
  getListSubCateAgriTechSuccess,
  getListCateAgriTechSuccess,
  deleteNewsSuccess,
  addNewsAgriTechSuccess,
  addNewsNotDataAgriTechSuccess,
  getListNewsAgriTechFail,
  deleteNewsFail,
  addNewsAgriTechFail,
  updateImageAGSuccess,
  updateImageAGFail,
  updateTagsSuccess,
  updateTagsFail,
  updateNewsAGSuccess,
  updateNewsAGFail,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListNewsAgriTech,
  callAPIGetListSubCateAgriTech,
  callAPIGetListCateAgriTech,
  callAPIDeleteNewsAgriTech,
  callAPIAddNewsAgriTech,
  callAPIUpdateTagsNewsAG,
  callAPIUpdateImageNewsAG,
  callAPIUpdateNewsAG,
} from 'utils/request';
import {
  selectidSubCateNewsAgriTech,
  selectPageNewsAgriTech,
  selectIdCateGetSubCate,
  selectidNewsAgriTech,
  selectIdNewsATDel,
  selectNewsAddAgriTech,
  selectidNewsAGEdit,
  selectImageAGUpdate,
  selectTags,
  selectNewsAGUpdate,
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
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi đăng nhập !');
  }
  
}
export function* getListCateAgriTechWatcher() {
  while (yield take(GET_LIST_CATE_AGRI_TECH_ACTION)) {
    yield call(getListCateAgriTech);
  }
}
export function* getListNewsAgriTech() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidSubCateNewsAgriTech());
  const page = yield select(selectPageNewsAgriTech());
  const response = yield call(callAPIGetListNewsAgriTech,userInfo.phone,userInfo.password,id,page);
  try{
    if (response.data.data.e==0) {
      yield put(getListNewsAgriTechSuccess(response.data.data.array,response.data.data.total));
    } else {
      message.error(response.data.data.msg);
      yield put(getListNewsAgriTechFail())
    }
  } catch(error){
    message.error(response.data.data.e+": 'Load danh sách tin tức lỗi !'");
    yield put(getListNewsAgriTechFail())
  }
  
}
export function* getListNewsAgriTechWatcher() {
  while (yield take(GET_LIST_AGRI_TECH_ACTION)) {
    yield call(getListNewsAgriTech);
  }
}
export function* getListSubCategoryNewsAgriTech() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdCateGetSubCate());
  const response = yield call(callAPIGetListSubCateAgriTech,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
        yield put(getListSubCateAgriTechSuccess(response.data.data.array));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi đăng nhập !');
  }
  
}
export function* getListSubCategoryNewsAgriTechWatcher() {
  while (yield take(GET_LIST_SUB_CATE_AGRI_TECH_ACTION)) {
    yield call(getListSubCategoryNewsAgriTech);
  }
}
export function* deleteNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdNewsATDel());
  const response = yield call(callAPIDeleteNewsAgriTech,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
        yield put(deleteNewsSuccess(id));
        message.success('Xóa tin tức thành công !');
    } else {
      message.error(response.data.data.msg);
      yield put(deleteNewsFail())
    }
  } catch(error){
          message.error(response.data.data.e+': Xóa tin tức lỗi !');
          yield put(deleteNewsFail())
  }
  
}
export function* deleteNewsWatcher() {
  while (yield take(DELETE_NEWS_AGRI_TECH_ACTION)) {
    yield call(deleteNews);
  }
}
export function* addNewsAgriTech() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const newsAdd = yield select(selectNewsAddAgriTech());
  const response = yield call(callAPIAddNewsAgriTech,userInfo.phone,userInfo.password,newsAdd.get("title"),
      newsAdd.get("author"),newsAdd.get("image"),
      newsAdd.get("tags"), newsAdd.get("idsubcate"), newsAdd.get("content"));
  try{
    if (response.data.data.e==0) {
      if(newsAdd.get("idSubCateLink")!==newsAdd.get("idsubcate")){
        yield put(addNewsNotDataAgriTechSuccess(0))
      }else{
        yield put(addNewsAgriTechSuccess(response.data.data.data,0));
      }
      message.success('Thêm tin tức thành công !');
    } else {
      message.error(response.data.data.msg);
      yield put(addNewsAgriTechFail(response.data.data.e))
    }
  } catch(error){
          message.error(response.data.data.e+': Thêm tin tức lỗi !');
          yield put(addNewsAgriTechFail(response.data.data.e))
  }
  
}
export function* addNewsAgriTechWatcher() {
  while (yield take(ADD_NEWS_AGRI_TECH_ACTION)) {
    yield call(addNewsAgriTech);
  }
}
export function* updateTagsNewsAG() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidNewsAGEdit());
  const tags = yield select(selectTags());
  const response = yield call(callAPIUpdateTagsNewsAG,userInfo.phone,userInfo.password,tags,id);
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
export function* updateTagsNewsAGWatcher() {
  while (yield take(UPDATE_TAGS_AG_ACTION)) {
    yield call(updateTagsNewsAG);
  }
}

export function* updateImageNewsAG() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidNewsAGEdit());
  const image = yield select(selectImageAGUpdate());
  const response = yield call(callAPIUpdateImageNewsAG,userInfo.phone,userInfo.password,image,id);
  try{
    if (response.data.data.e==0) {
        yield put(updateImageAGSuccess(response.data.data.data));
        message.success('Thành công !');
    } else {
      message.error(response.data.data.msg);
      yield put(updateImageAGFail())
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Có lỗi trong quá trình xử lý !');
          yield put(updateImageAGFail())
  }
  
}
export function* updateImageNewsAGWatcher() {
  while (yield take(UPDATE_IMAGE_NEWS_AG_ACTION)) {
    yield call(updateImageNewsAG);
  }
}

export function* updateNewsAG() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const newUpdate = yield select(selectNewsAGUpdate());
  const response = yield call(callAPIUpdateNewsAG,userInfo.phone,userInfo.password,
                                newUpdate.get("idnews"),
                                newUpdate.get("title"),
                                newUpdate.get("author"),
                                newUpdate.get("idsubcate"), 
                                newUpdate.get("content"));
  try{
    if (response.data.data.e==0) {
      yield put(updateNewsAGSuccess(response.data.data.data))
      message.success('Thành công !');
    } else {
      message.error(response.data.data.msg);
      yield put(updateNewsAGFail())
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Có lỗi trong quá trình xử lý');
          yield put(updateNewsAGFail())
  }
  
}
export function* updateNewsAGWatcher() {
  while (yield take(UPDATE_NEWS_AG_ACTION)) {
    yield call(updateNewsAG);
  }
}


export function* defaultSaga() {
  const watchergetListCateAgriTech = yield fork(getListCateAgriTechWatcher);
  const watchergetListNewsAgriTech = yield fork(getListNewsAgriTechWatcher);
  const watchergetListSubCategoryNewsAgriTech = yield fork(getListSubCategoryNewsAgriTechWatcher);
  const watcherdeleteNews = yield fork(deleteNewsWatcher);
  const watcheraddNewsAgriTech = yield fork(addNewsAgriTechWatcher);
  const watcherupdateTagsNewsAG = yield fork(updateTagsNewsAGWatcher);
  const watcherupdateImageNewsAG = yield fork(updateImageNewsAGWatcher);
  const watcherupdateNewsAG = yield fork(updateNewsAGWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListCateAgriTech);
    yield cancel(watchergetListNewsAgriTech);
    yield cancel(watchergetListSubCategoryNewsAgriTech);
    yield cancel(watcherdeleteNews);
    yield cancel(watcheraddNewsAgriTech);
    yield cancel(watcherupdateTagsNewsAG);
    yield cancel(watcherupdateImageNewsAG);
    yield cancel(watcherupdateNewsAG);
  }
}
export default [
  defaultSaga,
];
