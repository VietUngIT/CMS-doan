
import { fromJS } from 'immutable';
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

const initialState = fromJS({
  listField: [],
  nameFieldAdd: false,
  errorCode: false,
  idDelField: false,
  loading: false,
});

function listExpertReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return state
      .set("loading",action.loading)
    case GET_LIST_FIELD_ACTION:
      return state
      .set("listField",[])
      .set("loading",true)
    case GET_LIST_FIELD_ACTION_SUCCESS:
      return state
      .update('listField', listField => listField.concat(action.data))
      .set("loading",false)
    case GET_LIST_FIELD_ACTION_FAIL:
      return state
      .set("loading",false)
    case DELETE_LIST_FIELD_ACTION:
      return state
      .set("idDelField",action.id)
      .set("loading",true)
    case DELETE_LIST_FIELD_ACTION_SUCCESS:
      return state
      .set('listField', state.get('listField').filter((item) => { return item.id !== action.id}))
      .set("idDelField",false)
      .set("loading",false)
    case DELETE_LIST_FIELD_ACTION_FAIL:
      return state
      .set("idDelField",false)
      .set("loading",false)
    case ADD_LIST_FIELD_ACTION:
      return state
      .set("nameFieldAdd",action.name)
      .set("errorCode",false)
      .set("loading",true)
    case ADD_LIST_FIELD_ACTION_SUCCESS:
      return state
      .update('listField', listField => listField.concat(action.field))
      .set("nameFieldAdd",false)
      .set("errorCode",action.error)
      .set("loading",false)
    case ADD_LIST_FIELD_ACTION_FAIL:
      return state
      .set("nameFieldAdd",false)
      .set("errorCode",false)
      .set("loading",false)
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default listExpertReducer;
