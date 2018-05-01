
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_FIELD_ACTION,
  GET_LIST_FIELD_ACTION_SUCCESS,
  ADD_LIST_FIELD_ACTION,
  ADD_LIST_FIELD_ACTION_SUCCESS,
  DELETE_LIST_FIELD_ACTION,
  DELETE_LIST_FIELD_ACTION_SUCCESS,
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
    case GET_LIST_FIELD_ACTION_SUCCESS:
      return state
      .update('listField', listField => listField.concat(action.data))
    case DELETE_LIST_FIELD_ACTION:
      return state
      .set("idDelField",action.id)
    case DELETE_LIST_FIELD_ACTION_SUCCESS:
      return state
      .set('listField', state.get('listField').filter((item) => { return item.id !== action.id}))
      .set("idDelField",false)
    case ADD_LIST_FIELD_ACTION:
      return state
      .set("nameFieldAdd",action.name)
      .set("errorCode",false)
    case ADD_LIST_FIELD_ACTION_SUCCESS:
      return state
      .update('listField', listField => listField.concat(action.field))
      .set("nameFieldAdd",false)
      .set("errorCode",action.error)
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default listExpertReducer;
