
import { fromJS } from 'immutable';
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
} from './constants';

const initialState = fromJS({
  expertDetail: false,
  isLoading: false,
  idExpert: false,
  listField: [],
  degree: [],
  listSubField: [],
  idSubField: [],
  phone: false,
  tags: [],
  // stateTags: false,
});

function expertDetailReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TAGS_ACTION:
      return state
      .set("tags",action.tags)
      .set("phone",action.phone)
    case UPDATE_TAGS_ACTION_SUCCESS:
      return state
      .set("expertDetail",action.data)
      .set("tags",[])
      .set("phone",false)
    case UPDATE_TAGS_ACTION_ERROR:
      return state
      .set("tags",[])
      .set("phone",false)
    case UPDATE_SUB_FIELD_ACTION:
      return state
      .set("idSubField",action.ids)
      .set("phone",action.phone)
    case UPDATE_SUB_FIELD_ACTION_SUCCESS:
      return state
      .set("expertDetail",action.data)
      .set("idSubField",[])
      .set("phone",false)
    case UPDATE_SUB_FIELD_ACTION_ERROR:
      return state
      .set("idSubField",[])
      .set("phone",false)
    case GET_LIST_SUB_FIELD_ACTION:
      return state
      .set("listSubField",[])
    case GET_LIST_SUB_FIELD_ACTION_SUCCESS:
      return state
      .update('listSubField', listSubField => listSubField.concat(action.data))
    case UPDATE_DEGREE_ACTION:
      return state
      .set("degree",action.degree)
      .set("phone",action.phone)
    case UPDATE_DEGREE_ACTION_SUCCESS:
      return state
      .set("expertDetail",action.data)
      .set("degree",[])
      .set("phone",false)
    case UPDATE_DEGREE_ACTION_ERROR:
      return state
      .set("degree",[])
      .set("phone",false)
    case GET_LIST_FIELD_ACTION:
      return state
      .set("listField",[])
    case GET_LIST_FIELD_ACTION_SUCCESS:
      return state
      .update('listField', listField => listField.concat(action.data))
    case GET_EXPERT_DETAIL_ACTION:
      return state
        .set("expertDetail",false)
        .set("isLoading",true)
        .set("idExpert",action.id)
    case GET_EXPERT_DETAIL_ACTION_SUCCESS:
      return state
        .set("expertDetail",action.data)
        .set("isLoading",false)
        .set("idExpert",false)
    case GET_EXPERT_DETAIL_ACTION_ERROR:
      return state
        .set("isLoading",false)
        .set("idExpert",false)
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default expertDetailReducer;
