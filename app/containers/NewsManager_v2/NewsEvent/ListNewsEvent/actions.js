/*
 *
 * ListNewsEvent actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_NEWS_ACTION,
  GET_LIST_NEWS_ACTION_SUCCESS,
  GET_LIST_NEWS_ACTION_FAIL,
  DELETE_NEWS_ACTION,
  DELETE_NEWS_ACTION_SUCCESS,
  DELETE_NEWS_ACTION_FAIL,
  ADD_NEWS_ACTION,
  ADD_NEWS_ACTION_SUCCESS,
  ADD_NEWS_NOT_DATA_ACTION_SUCCESS,
  GET_LIST_CATE_ACTION,
  GET_LIST_CATE_ACTION_SUCCESS,
  ADD_NEWS_NOT_DATA_ACTION_FAIL,
  ADD_TAGS_ACTION,
  ADD_TAGS_ACTION_SUCCESS,
  ADD_TAGS_ACTION_FAIL,
  UPDATE_IMAGE_NEWS_EVENT_ACTION,
  UPDATE_IMAGE_NEWS_EVENT_ACTION_SUCCESS,
  UPDATE_IMAGE_NEWS_EVENT_ACTION_FAIL,
  UPDATE_NEWS_EVENT_ACTION,
  UPDATE_NEWS_EVENT_ACTION_SUCCESS,
  UPDATE_NEWS_EVENT_ACTION_FAIL,
  GET_COMMENT_NEWS_EVENT_ACTION,
  GET_COMMENT_NEWS_EVENT_ACTION_SUCCESS,
  GET_COMMENT_NEWS_EVENT_ACTION_FAIL,
  INIT_PAGE_TOTAL_NEWS_EVENT_ACTION,
  DEL_COMMENT_NEWS_EVENT_ACTION,
  DEL_COMMENT_NEWS_EVENT_ACTION_SUCCESS,
  DEL_COMMENT_NEWS_EVENT_ACTION_FAIL,
} from './constants';

export function delComment(id,idNews) {
  return {
    type: DEL_COMMENT_NEWS_EVENT_ACTION,
    id,
    idNews,
  };
}
export function delCommentSuccess(id,idNewsToCommentDel) {
  return {
    type: DEL_COMMENT_NEWS_EVENT_ACTION_SUCCESS,
    id,
    idNewsToCommentDel,
  };
}
export function delCommentFail() {
  return {
    type: DEL_COMMENT_NEWS_EVENT_ACTION_FAIL,
  };
}
export function initPageTotalComment() {
  return {
    type: INIT_PAGE_TOTAL_NEWS_EVENT_ACTION,
  };
}
export function getCommentNews(id,page) {
  return {
    type: GET_COMMENT_NEWS_EVENT_ACTION,
    id,
    page,
  };
}
export function getCommentNewsSuccess(data,total) {
  return {
    type: GET_COMMENT_NEWS_EVENT_ACTION_SUCCESS,
    data,
    total,
  };
}
export function getCommentNewsFail(data,total) {
  return {
    type: GET_COMMENT_NEWS_EVENT_ACTION_FAIL,
  };
}

export function updateNewsEvent(idnews,title,shortDesc,author,source,idcate,content) {
  return {
    type: UPDATE_NEWS_EVENT_ACTION,
    idnews,
    title,
    shortDesc,
    author,
    source,
    idcate,
    content,
  };
}
export function updateNewsEventSuccess(data) {
  return {
    type: UPDATE_NEWS_EVENT_ACTION_SUCCESS,
    data,
  };
}
export function updateNewsEventFail() {
  return {
    type: UPDATE_NEWS_EVENT_ACTION_FAIL,
  };
}
export function updateImage(image,id) {
  return {
    type: UPDATE_IMAGE_NEWS_EVENT_ACTION,
    image,
    id,
  };
}
export function updateImageSuccess(data) {
  return {
    type: UPDATE_IMAGE_NEWS_EVENT_ACTION_SUCCESS,
    data,
  };
}
export function updateImageFail() {
  return {
    type: UPDATE_IMAGE_NEWS_EVENT_ACTION_FAIL,
  };
}
export function updateTags(tags,id) {
  return {
    type: ADD_TAGS_ACTION,
    tags,
    id,
  };
}
export function updateTagsSuccess(data) {
  return {
    type: ADD_TAGS_ACTION_SUCCESS,
    data,
  };
}
export function updateTagsFail() {
  return {
    type: ADD_TAGS_ACTION_FAIL,
  };
}
export function getListCateNews() {
  return {
    type: GET_LIST_CATE_ACTION,
  };
}
export function getListCateNewsSuccess(categoryNews) {
  return {
    type: GET_LIST_CATE_ACTION_SUCCESS,
    categoryNews,
  };
}

export function addNews(idCateLink,title,shortDesc,author,image,source,tags,idcate,content) {
  return {
    type: ADD_NEWS_ACTION,
    idCateLink,
    title,
    shortDesc,
    author,
    image,
    source,
    tags,
    idcate,
    content,
  };
}
export function addNewsSuccess(news,error) {
  return {
    type: ADD_NEWS_ACTION_SUCCESS,
    news,
    error,
  };
}
export function addNewsNotDataSuccess(error) {
  return {
    type: ADD_NEWS_NOT_DATA_ACTION_SUCCESS,
    error,
  };
}
export function addNewsFail(error) {
  return {
    type: ADD_NEWS_NOT_DATA_ACTION_FAIL,
    error,
  };
}

export function deleteNews(id) {
  return {
    type: DELETE_NEWS_ACTION,
    id,
  };
}
export function deleteNewsSuccess(id) {
  return {
    type: DELETE_NEWS_ACTION_SUCCESS,
    id,
  };
}
export function deleteNewsFail() {
  return {
    type: DELETE_NEWS_ACTION_FAIL,
  };
}

export function getListNews(idcate,page) {
  return {
    type: GET_LIST_NEWS_ACTION,
    idcate,
    page,
  };
}
export function getListNewsSuccess(listNews,total) {
  return {
    type: GET_LIST_NEWS_ACTION_SUCCESS,
    listNews,
    total,
  };
}
export function getListNewsFail() {
  return {
    type: GET_LIST_NEWS_ACTION_FAIL,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
