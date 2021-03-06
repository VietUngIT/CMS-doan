/*
 *
 * ListMarketInfo actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_MK_ACTION,
  GET_LIST_MK_ACTION_SUCCESS,
  GET_LIST_MK_ACTION_FAIL,
  GET_LIST_CATE_MK_ACTION,
  GET_LIST_CATE_MK_ACTION_SUCCESS,
  DELETE_NEWS_MK_ACTION,
  DELETE_NEWS_MK_ACTION_SUCCESS,
  ADD_NEWS_MK_ACTION,
  ADD_NEWS_MK_ACTION_SUCCESS,
  ADD_NEWS_MK_NOT_DATA_ACTION_SUCCESS,
  ADD_NEWS_MK_NOT_DATA_ACTION_FAIL,
  DELETE_NEWS_MK_ACTION_FAIL,
  UPDATE_TAGS_MK_ACTION,
  UPDATE_TAGS_MK_ACTION_SUCCESS,
  UPDATE_TAGS_MK_ACTION_FAIL,
  UPDATE_IMAGE_NEWS_MK_ACTION,
  UPDATE_IMAGE_NEWS_MK_ACTION_SUCCESS,
  UPDATE_IMAGE_NEWS_MK_ACTION_FAIL,
  UPDATE_NEWS_MK_ACTION,
  UPDATE_NEWS_MK_ACTION_SUCCESS,
  UPDATE_NEWS_MK_ACTION_FAIL,
  GET_COMMENT_NEWS_MK_ACTION,
  GET_COMMENT_NEWS_MK_ACTION_SUCCESS,
  GET_COMMENT_NEWS_MK_ACTION_FAIL,
  DEL_COMMENT_NEWS_MK_ACTION,
  DEL_COMMENT_NEWS_MK_ACTION_SUCCESS,
  DEL_COMMENT_NEWS_MK_ACTION_FAIL,
} from './constants';

export function delComment(id,idNews) {
  return {
    type: DEL_COMMENT_NEWS_MK_ACTION,
    id,
    idNews,
  };
}
export function delCommentSuccess(id,idNewsToCommentDel) {
  return {
    type: DEL_COMMENT_NEWS_MK_ACTION_SUCCESS,
    id,
    idNewsToCommentDel,
  };
}
export function delCommentFail() {
  return {
    type: DEL_COMMENT_NEWS_MK_ACTION_FAIL,
  };
}
export function getCommentNews(id,page) {
  return {
    type: GET_COMMENT_NEWS_MK_ACTION,
    id,
    page,
  };
}
export function getCommentNewsSuccess(data,total) {
  return {
    type: GET_COMMENT_NEWS_MK_ACTION_SUCCESS,
    data,
    total,
  };
}
export function getCommentNewsFail(data,total) {
  return {
    type: GET_COMMENT_NEWS_MK_ACTION_FAIL,
  };
}
export function updateNewsMK(idnews,title,author,source,idcate,content) {
  return {
    type: UPDATE_NEWS_MK_ACTION,
    idnews,
    title,
    author,
    source,
    idcate,
    content,
  };
}
export function updateNewsMKSuccess(data) {
  return {
    type: UPDATE_NEWS_MK_ACTION_SUCCESS,
    data,
  };
}
export function updateNewsMKFail() {
  return {
    type: UPDATE_NEWS_MK_ACTION_FAIL,
  };
}

export function updateImageMK(image,id) {
  return {
    type: UPDATE_IMAGE_NEWS_MK_ACTION,
    image,
    id,
  };
}
export function updateImageMKSuccess(data) {
  return {
    type: UPDATE_IMAGE_NEWS_MK_ACTION_SUCCESS,
    data,
  };
}
export function updateImageMKFail() {
  return {
    type: UPDATE_IMAGE_NEWS_MK_ACTION_FAIL,
  };
}
export function updateTags(tags,id) {
  return {
    type: UPDATE_TAGS_MK_ACTION,
    tags,
    id,
  };
}
export function updateTagsSuccess(data) {
  return {
    type: UPDATE_TAGS_MK_ACTION_SUCCESS,
    data,
  };
}
export function updateTagsFail() {
  return {
    type: UPDATE_TAGS_MK_ACTION_FAIL,
  };
}
export function addNewsMK(idCateLink,title,author,image,source,tags,idcate,content) {
  return {
    type: ADD_NEWS_MK_ACTION,
    idCateLink,
    title,
    author,
    image,
    source,
    tags,
    idcate,
    content,
  };
}
export function addNewsMKSuccess(news,error) {
  return {
    type: ADD_NEWS_MK_ACTION_SUCCESS,
    news,
    error,
  };
}
export function addNewsNotDataMKSuccess(error) {
  return {
    type: ADD_NEWS_MK_NOT_DATA_ACTION_SUCCESS,
    error,
  };
}
export function addNewsFail(error) {
  return {
    type: ADD_NEWS_MK_NOT_DATA_ACTION_FAIL,
    error,
  };
}
export function deleteNewsMK(id) {
  return {
    type: DELETE_NEWS_MK_ACTION,
    id,
  };
}
export function deleteNewsMKSuccess(id) {
  return {
    type: DELETE_NEWS_MK_ACTION_SUCCESS,
    id,
  };
}
export function deleteNewsMKFail() {
  return {
    type: DELETE_NEWS_MK_ACTION_FAIL,
  };
}
export function getListCateNewsMK() {
  return {
    type: GET_LIST_CATE_MK_ACTION,
  };
}
export function getListCateNewsMKSuccess(categoryNews) {
  return {
    type: GET_LIST_CATE_MK_ACTION_SUCCESS,
    categoryNews,
  };
}
export function getListNewsMK(idcate,page) {
  return {
    type: GET_LIST_MK_ACTION,
    idcate,
    page,
  };
}
export function getListNewsMKSuccess(listNews,total) {
  return {
    type: GET_LIST_MK_ACTION_SUCCESS,
    listNews,
    total,
  };
}
export function getListNewsMKFail() {
  return {
    type: GET_LIST_MK_ACTION_FAIL,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
