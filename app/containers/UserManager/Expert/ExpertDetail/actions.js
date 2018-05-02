
import {
  DEFAULT_ACTION,
  GET_EXPERT_DETAIL_ACTION,
  GET_EXPERT_DETAIL_ACTION_SUCCESS,
  GET_EXPERT_DETAIL_ACTION_ERROR,
  GET_LIST_FIELD_ACTION,
  GET_LIST_FIELD_ACTION_SUCCESS,
  UPDATE_DEGREE_ACTION,
  UPDATE_DEGREE_ACTION_SUCCESS,
  UPDATE_DEGREE_ACTION_ERROR
} from './constants';

export function updateDegree(degree,phone) {
  return {
    type: UPDATE_DEGREE_ACTION,
    degree,
    phone,
  };
}
export function updateDegreeSuccess(data) {
  return {
    type: UPDATE_DEGREE_ACTION_SUCCESS,
    data,
  };
}
export function updateDegreeError() {
  return {
    type: UPDATE_DEGREE_ACTION_ERROR,
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
export function getExpertDetail(id) {
  return {
    type: GET_EXPERT_DETAIL_ACTION,
    id,
  };
}
export function getExpertDetailSuccess(data) {
  return {
    type: GET_EXPERT_DETAIL_ACTION_SUCCESS,
    data,
  };
}
export function getExpertDetailError() {
  return {
    type: GET_EXPERT_DETAIL_ACTION_ERROR,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
