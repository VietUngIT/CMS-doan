/*
 *
 * CateNewsEvent actions
 *
 */

import {
  DEFAULT_ACTION,
  ADD_CATE_NEWS_ACTION,
  ADD_CATE_NEWS_ACTION_SUCCESS,
  GET_LIST_CATE_NEWS_ACTION,
  GET_LIST_CATE_NEWS_ACTION_SUCCESS,
  GET_LIST_CATE_NEWS_ACTION_FAIL,
  DEL_CATE_NEWS_ACTION,
  DEL_CATE_NEWS_ACTION_SUCCESS,
  DEL_CATE_NEWS_ACTION_FAIL,
  ADD_CATE_NEWS_ACTION_FAIL,
} from './constants';

export function delCateNews(id) {
  return {
    type: DEL_CATE_NEWS_ACTION,
    id,
  };
}
export function delCateNewsSuccess(id) {
  return {
    type: DEL_CATE_NEWS_ACTION_SUCCESS,
    id,
  };
}
export function delCateNewsFail() {
  return {
    type: DEL_CATE_NEWS_ACTION_FAIL,
  };
}

export function getListCateNews() {
  return {
    type: GET_LIST_CATE_NEWS_ACTION,
  };
}
export function getListCateNewsSuccess(categoryNews) {
  return {
    type: GET_LIST_CATE_NEWS_ACTION_SUCCESS,
    categoryNews,
  };
}
export function getListCateNewsFail() {
  return {
    type: GET_LIST_CATE_NEWS_ACTION_FAIL,
  };
}

export function addCateNews(categoryNews) {
  return {
    type: ADD_CATE_NEWS_ACTION,
    categoryNews,
  };
}
export function addCateNewsSuccess(addCateNews) {
  return {
    type: ADD_CATE_NEWS_ACTION_SUCCESS,
    addCateNews,
  };
}
export function addCateNewsFail() {
  return {
    type: ADD_CATE_NEWS_ACTION_FAIL,
    
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
