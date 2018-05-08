
import {
  DEFAULT_ACTION,
  GET_CATE_ACTION,
  GET_CATE_ACTION_SUCCESS,
  GET_CATE_ACTION_FAIL,
  ADD_CATE_ACTION,
  ADD_CATE_ACTION_SUCCESS,
  ADD_CATE_ACTION_FAIL,
  DELETE_CATE_ACTION,
  DELETE_CATE_ACTION_SUCCESS,
  DELETE_CATE_ACTION_FAIL,
  LOADING_ACTION,
} from './constants';


export function setLoading(loading) {
  return {
    type: LOADING_ACTION,
    loading,
  };
}
export function delCateMP(id) {
  return {
    type: DELETE_CATE_ACTION,
    id,
  };
}
export function delCateMPSuccess(id) {
  return {
    type: DELETE_CATE_ACTION_SUCCESS,
    id,
  };
}
export function delCateMPFail() {
  return {
    type: DELETE_CATE_ACTION_FAIL,
  };
}
export function addCateMP(nameCate,image) {
  return {
    type: ADD_CATE_ACTION,
    nameCate,
    image,
  };
}
export function addCateMPSuccess(cate,error) {
  return {
    type: ADD_CATE_ACTION_SUCCESS,
    cate,
    error,
  };
}
export function addCateMPFail(error) {
  return {
    type: ADD_CATE_ACTION_FAIL,
    error,
  };
}
export function getListCateMP() {
  return {
    type: GET_CATE_ACTION,
  };
}
export function getListCateMPSuccess(data) {
  return {
    type: GET_CATE_ACTION_SUCCESS,
    data,
  };
}
export function getListCateMPFail() {
  return {
    type: GET_CATE_ACTION_FAIL,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
