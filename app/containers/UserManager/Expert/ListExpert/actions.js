/*
 *
 * ListExpert actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_FIELD_ACTION,
  GET_LIST_FIELD_ACTION_SUCCESS,
  ADD_LIST_FIELD_ACTION,
  ADD_LIST_FIELD_ACTION_SUCCESS,
  DELETE_LIST_FIELD_ACTION,
  DELETE_LIST_FIELD_ACTION_SUCCESS,
  GET_LIST_FIELD_ACTION_FAIL,
  ADD_LIST_FIELD_ACTION_FAIL,
  DELETE_LIST_FIELD_ACTION_FAIL,
  LOADING,
} from './constants';

export function setLoading(loading) {
  return {
    type: LOADING,
    loading,
  };
}
export function delField(id) {
  return {
    type: DELETE_LIST_FIELD_ACTION,
    id,
  };
}
export function delFieldSuccess(id) {
  return {
    type: DELETE_LIST_FIELD_ACTION_SUCCESS,
    id,
  };
}
export function delFieldFail() {
  return {
    type: DELETE_LIST_FIELD_ACTION_FAIL,
  };
}
export function addField(name) {
  return {
    type: ADD_LIST_FIELD_ACTION,
    name,
  };
}
export function addFieldSuccess(field,error) {
  return {
    type: ADD_LIST_FIELD_ACTION_SUCCESS,
    field,
    error,
  };
}
export function addFieldFail() {
  return {
    type: ADD_LIST_FIELD_ACTION_FAIL,
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
export function getListFieldFail() {
  return {
    type: GET_LIST_FIELD_ACTION_FAIL,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
