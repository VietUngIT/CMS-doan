
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
  STATITIC_COMMENT_ACTION,
  STATITIC_COMMENT_ACTION_SUCCESS,
  STATITIC_COMMENT_ACTION_ERROR,
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
  totalActice: false,
  statiticComment: [],
  idExpertStatitic: false,
});

function expertDetailReducer(state = initialState, action) {
  switch (action.type) {
    case STATITIC_COMMENT_ACTION:
      return state
      .set("idExpertStatitic",action.id)
      .set("statiticComment",[])
      .set("isLoading",true)
      .set("totalActice",false)
    case STATITIC_COMMENT_ACTION_SUCCESS:
      return state
      .update('statiticComment', statiticComment => statiticComment.concat(action.data))
      .set("idExpertStatitic",false)
      .set("totalActice",action.total)
      .set("isLoading",false)
    case STATITIC_COMMENT_ACTION_ERROR:
      return state
      .set("idExpertStatitic",false)
      .set("statiticComment",[])
      .set("isLoading",false)
    case UPDATE_TAGS_ACTION:
      return state
      .set("tags",action.tags)
      .set("phone",action.phone)
      .set("isLoading",true)
    case UPDATE_TAGS_ACTION_SUCCESS:
      return state
      .set("expertDetail",action.data)
      .set("tags",[])
      .set("phone",false)
      .set("isLoading",false)
    case UPDATE_TAGS_ACTION_ERROR:
      return state
      .set("tags",[])
      .set("phone",false)
      .set("isLoading",false)
    case UPDATE_SUB_FIELD_ACTION:
      return state
      .set("idSubField",action.ids)
      .set("phone",action.phone)
      .set("isLoading",true)
    case UPDATE_SUB_FIELD_ACTION_SUCCESS:
      return state
      .set("expertDetail",action.data)
      .set("idSubField",[])
      .set("phone",false)
      .set("isLoading",false)
    case UPDATE_SUB_FIELD_ACTION_ERROR:
      return state
      .set("idSubField",[])
      .set("phone",false)
      .set("isLoading",false)
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
      .set("isLoading",true)
    case UPDATE_DEGREE_ACTION_SUCCESS:
      return state
      .set("expertDetail",action.data)
      .set("degree",[])
      .set("phone",false)
      .set("isLoading",false)
    case UPDATE_DEGREE_ACTION_ERROR:
      return state
      .set("degree",[])
      .set("phone",false)
      .set("isLoading",false)
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
        .set("statiticComment",[])
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
