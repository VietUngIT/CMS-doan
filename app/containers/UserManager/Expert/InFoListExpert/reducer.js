/*
 *
 * InFoListExpert reducer
 *
 */

import { fromJS } from 'immutable';
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

const initialState = fromJS({
  listExpert: [],
  idField: false,
  isLoading: false,
  page: false,
  total: false,
  expertAdd: {
    idfieldcurrent: false,
    name: false,
    phone: false,
    desc: false,
    email: false,
    address: false,
    workplace: false,
    idfield: false,
    lat: false,
    long: false,
    tags: false,
    degree: false,
    errorcode: false,
  }
});

function inFoListExpertReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EXPERT_ACTION:
      return state
      .setIn(['expertAdd', 'idfieldcurrent'], action.idfieldcurrent)
      .setIn(['expertAdd', 'name'], action.name)
      .setIn(['expertAdd', 'phone'], action.phone)
      .setIn(['expertAdd', 'desc'], action.desc)
      .setIn(['expertAdd', 'email'], action.email)
      .setIn(['expertAdd', 'address'], action.address)
      .setIn(['expertAdd', 'workplace'], action.workplace)
      .setIn(['expertAdd', 'idfield'], action.idfield)
      .setIn(['expertAdd', 'lat'], action.lat)
      .setIn(['expertAdd', 'long'], action.long)
      .setIn(['expertAdd', 'tags'], action.tags)
      .setIn(['expertAdd', 'degree'], action.degree)
      .setIn(['expertAdd', 'errorcode'], false)
      .set("isLoading", true)
    case ADD_EXPERT_ACTION_SUCCESS:
      return state
      .update('listExpert', listExpert => [].concat(action.expert).concat(listExpert))
      .setIn(['expertAdd', 'idfieldcurrent'], false)
      .setIn(['expertAdd', 'name'], false)
      .setIn(['expertAdd', 'phone'], false)
      .setIn(['expertAdd', 'desc'], false)
      .setIn(['expertAdd', 'email'], false)
      .setIn(['expertAdd', 'address'], false)
      .setIn(['expertAdd', 'workplace'], false)
      .setIn(['expertAdd', 'idfield'], false)
      .setIn(['expertAdd', 'lat'], false)
      .setIn(['expertAdd', 'long'], false)
      .setIn(['expertAdd', 'tags'], false)
      .setIn(['expertAdd', 'degree'], false)
      .setIn(['expertAdd', 'errorcode'], action.error)
      .set("isLoading", false)
    case ADD_EXPERT_ACTION_NO_DATA_SUCCESS:
      return state
      .setIn(['expertAdd', 'idfieldcurrent'], false)
      .setIn(['expertAdd', 'name'], false)
      .setIn(['expertAdd', 'phone'], false)
      .setIn(['expertAdd', 'desc'], false)
      .setIn(['expertAdd', 'email'], false)
      .setIn(['expertAdd', 'address'], false)
      .setIn(['expertAdd', 'workplace'], false)
      .setIn(['expertAdd', 'idfield'], false)
      .setIn(['expertAdd', 'lat'], false)
      .setIn(['expertAdd', 'long'], false)
      .setIn(['expertAdd', 'tags'], false)
      .setIn(['expertAdd', 'degree'], false)
      .setIn(['expertAdd', 'errorcode'], action.error)
      .set("isLoading", false)
    case ADD_EXPERT_ACTION_ERROR:
      return state
      .setIn(['expertAdd', 'errorcode'], action.error)
      .set("isLoading", false)
    case GET_LIST_EXPERT_ACTION:
      return state
      .set("listExpert",[])
      .set("idField", action.id)
      .set("isLoading", true)
      .set("page",action.page)
    case GET_LIST_EXPERT_ACTION_SUCCESS:
      return state
      .update('listExpert', listExpert => listExpert.concat(action.data))
      .set("total",action.total)
      .set("idField",false)
      .set("isLoading", false)
    case GET_LIST_EXPERT_ACTION_ERROR:
      return state
      .set("total",false)
      .set("idField",false)
      .set("isLoading", false)
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default inFoListExpertReducer;
