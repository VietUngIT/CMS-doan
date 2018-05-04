/*
 *
 * Qainfo reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_FIELD_ACTION,
  GET_LIST_FIELD_ACTION_SUCCESS,
  GET_LIST_QA_ACTION,
  GET_LIST_QA_ACTION_SUCCESS,
  GET_LIST_QA_ACTION_FAIL,
  LOADING,
} from './constants';

const initialState = fromJS({
  listField: [],
  listQA: [],
  idField: false,
  page: false,
  total: false,
  loading: false,
});

function qainfoReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return state
      .set("loading",action.loading)
    case GET_LIST_FIELD_ACTION:
      return state
      .set("listField",[])
    case GET_LIST_FIELD_ACTION_SUCCESS:
      return state
      .update('listField', listField => listField.concat(action.data))
    case GET_LIST_QA_ACTION:
      return state
      .set("listQA",[])
      .set("page",action.page)
      .set("idField",action.id)
      .set("loading",true)
    case GET_LIST_QA_ACTION_SUCCESS:
      return state
      .update('listQA', listQA => listQA.concat(action.data))
      .set("total",action.total)
      .set("idField",false)
      .set("loading",false)
      case GET_LIST_QA_ACTION_FAIL:
      return state
      .set("loading",false)
      .set("idField",false)
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default qainfoReducer;
