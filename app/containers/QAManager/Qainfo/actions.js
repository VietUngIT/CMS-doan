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
  ADD_QA_ACTION,
  ADD_QA_ACTION_FAIL,
  ADD_QA_ACTION_SUCCESS,
  ADD_QA_ACTION_NO_DATA_SUCCESS,
  ID_FIELD_SELECTED,
  QA_DETAIL_ACTION,
  DELETE_QA_ACTION,
  DELETE_QA_ACTION_SUCCESS,
  DELETE_QA_ACTION_FAIL,
  EDIT_QA_ACTION,
  EDIT_QA_ACTION_SUCCESS,
  EDIT_QA_ACTION_FAIL,
  LOADING,
} from './constants';

export function editQA(title,question,answer,id) {
  return {
    type: EDIT_QA_ACTION,
    title,
    question,
    answer,
    id,
  };
}
export function editQASuccess(data,error) {
  return {
    type: EDIT_QA_ACTION_SUCCESS,
    data,
    error,
  };
}
export function editQAFail(error) {
  return {
    type: EDIT_QA_ACTION_FAIL,
    error,
  };
}
export function delQA(id) {
  return {
    type: DELETE_QA_ACTION,
    id,
  };
}
export function delQASuccess(id) {
  return {
    type: DELETE_QA_ACTION_SUCCESS,
    id,
  };
}
export function delQAFail() {
  return {
    type: DELETE_QA_ACTION_FAIL,
  };
}
export function setQADetail(data) {
  return {
    type: QA_DETAIL_ACTION,
    data,
  };
}
export function setIdFieldSelected(id) {
  return {
    type: ID_FIELD_SELECTED,
    id,
  };
}
export function addQA(title,question,answer,id) {
  return {
    type: ADD_QA_ACTION,
    title,
    question,
    answer,
    id,
  };
}
export function addQAFail(error) {
  return {
    type: ADD_QA_ACTION_FAIL,
    error,
  };
}
export function addQASuccess(data,error) {
  return {
    type: ADD_QA_ACTION_SUCCESS,
    data,
    error,
  };
}
export function addQANoDataSuccess(error) {
  return {
    type: ADD_QA_ACTION_NO_DATA_SUCCESS,
    error,
  };
}
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
