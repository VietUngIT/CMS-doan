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

const initialState = fromJS({
  listField: [],
  listQA: [],
  idField: false,
  page: false,
  total: false,
  addQA: {
    idFieldSelect: false,
    title: false,
    question: false,
    answer: false,
    idField: false,
    errorCode: false,
  },
  editQA: {
    id: false,
    title: false,
    question: false,
    answer: false,
    errorCode: false,
  },
  idQADel: false,
  qaDetail: false,
  loading: false,
});

function qainfoReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_QA_ACTION:
      return state
      .setIn(["editQA","title"],action.title)
      .setIn(["editQA","question"],action.question)
      .setIn(["editQA","answer"],action.answer)
      .setIn(["editQA","id"],action.id)
      .setIn(["editQA","errorCode"],false)
      .set("loading",true)
    case EDIT_QA_ACTION_FAIL:
      return state
      .setIn(["editQA","title"],false)
      .setIn(["editQA","question"],false)
      .setIn(["editQA","answer"],false)
      .setIn(["editQA","id"],false)
      .setIn(["editQA","errorCode"],action.error)
      .set("loading",false)
    case EDIT_QA_ACTION_SUCCESS:
      return state
      .set('listQA', state.get('listQA').map((item) => { return item.id === action.data.id ? action.data : item;}))
      .setIn(["editQA","title"],false)
      .setIn(["editQA","question"],false)
      .setIn(["editQA","answer"],false)
      .setIn(["editQA","id"],false)
      .setIn(["editQA","errorCode"],action.error)
      .set("qaDetail",action.data)
      .set("loading",false)
    case DELETE_QA_ACTION:
      return state
      .set("idQADel",action.id)
      .set("loading",true)
    case DELETE_QA_ACTION_SUCCESS:
      return state
      .set('listQA', state.get('listQA').filter((item) => { return item.id !== action.id}))
      .set("idQADel",false)
      .set("qaDetail",false)
      .set("loading",false)
    case DELETE_QA_ACTION_FAIL:
      return state
      .set("idQADel",false)
      .set("loading",false)
    case ID_FIELD_SELECTED:
      return state
      .setIn(["addQA","idFieldSelect"],action.id)
    case QA_DETAIL_ACTION:
      return state
      .set("qaDetail",action.data)
    case ADD_QA_ACTION:
      return state
      .setIn(["addQA","title"],action.title)
      .setIn(["addQA","question"],action.question)
      .setIn(["addQA","answer"],action.answer)
      .setIn(["addQA","idField"],action.id)
      .setIn(["addQA","errorCode"],false)
      .set("loading",true)
    case ADD_QA_ACTION_FAIL:
      return state
      .setIn(["addQA","title"],false)
      .setIn(["addQA","question"],false)
      .setIn(["addQA","answer"],false)
      .setIn(["addQA","idField"],false)
      .setIn(["addQA","errorCode"],action.error)
      .set("loading",false)
    case ADD_QA_ACTION_SUCCESS:
      return state
      .update('listQA', listQA => [].concat(action.data).concat(listQA))
      .setIn(["addQA","title"],false)
      .setIn(["addQA","question"],false)
      .setIn(["addQA","answer"],false)
      .setIn(["addQA","idField"],false)
      .setIn(["addQA","errorCode"],action.error)
      .set("loading",false)
    case ADD_QA_ACTION_NO_DATA_SUCCESS:
      return state
      .setIn(["addQA","title"],false)
      .setIn(["addQA","question"],false)
      .setIn(["addQA","answer"],false)
      .setIn(["addQA","idField"],false)
      .setIn(["addQA","errorCode"],action.error)
      .set("loading",false)
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
