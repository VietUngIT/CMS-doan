
import {
  DEFAULT_ACTION,
  GET_EXPERT_DETAIL_ACTION,
  GET_EXPERT_DETAIL_ACTION_SUCCESS,
  GET_EXPERT_DETAIL_ACTION_ERROR,
  GET_LIST_FIELD_ACTION,
  GET_LIST_FIELD_ACTION_SUCCESS,
  UPDATE_DEGREE_ACTION,
  UPDATE_DEGREE_ACTION_SUCCESS,
  UPDATE_DEGREE_ACTION_ERROR,
  GET_LIST_SUB_FIELD_ACTION,
  GET_LIST_SUB_FIELD_ACTION_SUCCESS,
  UPDATE_SUB_FIELD_ACTION,
  UPDATE_SUB_FIELD_ACTION_SUCCESS,
  UPDATE_SUB_FIELD_ACTION_ERROR,
  UPDATE_TAGS_ACTION,
  UPDATE_TAGS_ACTION_SUCCESS,
  UPDATE_TAGS_ACTION_ERROR,
  STATITIC_COMMENT_ACTION,
  STATITIC_COMMENT_ACTION_SUCCESS,
  STATITIC_COMMENT_ACTION_ERROR,
} from './constants';

export function statiticCommentExpert(id) {
  return {
    type: STATITIC_COMMENT_ACTION,
    id,
  };
}
export function statiticCommentExpertSuccess(data,total) {
  return {
    type: STATITIC_COMMENT_ACTION_SUCCESS,
    data,
    total,
  };
}
export function statiticCommentExpertError() {
  return {
    type: STATITIC_COMMENT_ACTION_ERROR,
  };
}
export function updateTags(tags,phone) {
  return {
    type: UPDATE_TAGS_ACTION,
    tags,
    phone,
  };
}
export function updateTagsSuccess(data) {
  return {
    type: UPDATE_TAGS_ACTION_SUCCESS,
    data,
  };
}
export function updateTagsError() {
  return {
    type: UPDATE_TAGS_ACTION_ERROR,
  };
}

export function updateSubField(ids,phone) {
  return {
    type: UPDATE_SUB_FIELD_ACTION,
    ids,
    phone,
  };
}
export function updateSubFieldSuccess(data) {
  return {
    type: UPDATE_SUB_FIELD_ACTION_SUCCESS,
    data,
  };
}
export function updateSubFieldError() {
  return {
    type: UPDATE_SUB_FIELD_ACTION_ERROR,
  };
}
export function getListSubField() {
  return {
    type: GET_LIST_SUB_FIELD_ACTION,
  };
}
export function getListSubFieldSuccess(data) {
  return {
    type: GET_LIST_SUB_FIELD_ACTION_SUCCESS,
    data,
  };
}
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
