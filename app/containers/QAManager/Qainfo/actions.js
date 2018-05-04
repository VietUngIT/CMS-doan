/*
 *
 * Qainfo actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_FIELD_ACTION,
  GET_LIST_FIELD_ACTION_SUCCESS,
  GET_LIST_QA_ACTION,
  GET_LIST_QA_ACTION_SUCCESS,
  GET_LIST_QA_ACTION_FAIL,
  LOADING,
} from './constants';

export function setLoading(loading) {
  return {
    type: LOADING,
    loading,
  };
}
export function getListQA(page,id) {
  return {
    type: GET_LIST_QA_ACTION,
    page,
    id,
  };
}
export function getListQASuccess(data,total) {
  return {
    type: GET_LIST_QA_ACTION_SUCCESS,
    data,
    total,
  };
}
export function getListQAFail() {
  return {
    type: GET_LIST_QA_ACTION_FAIL,
  };
}
export function getListField() {
  return {
    type: GET_LIST_FIELD_ACTION,
  };
}
export function getListFieldSuccess(data) {
  return {
    type: GET_LIST_FIELD_ACTION_SUCCESS,
    data,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
