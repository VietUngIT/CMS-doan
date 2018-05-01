/*
 *
 * InFoListExpert actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_EXPERT_ACTION,
  GET_LIST_EXPERT_ACTION_SUCCESS,
  ADD_EXPERT_ACTION,
  ADD_EXPERT_ACTION_SUCCESS,
  ADD_EXPERT_ACTION_NO_DATA_SUCCESS,
  GET_LIST_EXPERT_ACTION_ERROR,
  ADD_EXPERT_ACTION_ERROR,
} from './constants';

export function addExpert(idfieldcurrent,name,phone,desc,email,address,workplace,idfield,lat,long,tags,degree) {
  return {
    type: ADD_EXPERT_ACTION,
    idfieldcurrent,
    name,
    phone,
    desc,
    email,
    address,
    workplace,
    idfield,
    lat,
    long,
    tags,
    degree,
  };
}
export function addExpertSuccess(expert,error) {
  return {
    type: ADD_EXPERT_ACTION_SUCCESS,
    expert,
    error,
  };
}
export function addExpertError(error) {
  return {
    type: ADD_EXPERT_ACTION_ERROR,
    error,
  };
}
export function addExpertNotDataSuccess(error) {
  return {
    type: ADD_EXPERT_ACTION_NO_DATA_SUCCESS,
    error,
  };
}

export function getListExpert(id,page) {
  return {
    type: GET_LIST_EXPERT_ACTION,
    id,
    page,
  };
}
export function getListExpertSuccess(data,total) {
  return {
    type: GET_LIST_EXPERT_ACTION_SUCCESS,
    data,
    total,
  };
}
export function getListExpertError() {
  return {
    type: GET_LIST_EXPERT_ACTION_ERROR,
    
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
