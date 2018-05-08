/*
 *
 * CateAgriTech reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_CATE_AGRI_TECH_ACTION,
  GET_LIST_CATE_AGRI_TECH_ACTION_SUCCESS,
  GET_LIST_CATE_AGRI_TECH_ACTION_FAIL,
  ADD_CATE_AGRI_TECH_ACTION,
  ADD_CATE_AGRI_TECH_ACTION_SUCCESS,
  ADD_CATE_AGRI_TECH_ACTION_FAIL,
  DEL_CATE_AGRI_TECH_ACTION,
  DEL_CATE_AGRI_TECH_ACTION_SUCCESS,
  DEL_CATE_AGRI_TECH_ACTION_FAIL,
  LOADING_ACTION,
} from './constants';

const initialState = fromJS({
  listCateAgriTech: [],
  nameCateAdd: false,
  idDelCate: false,
  loading: false,
});

function cateAgriTechReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_ACTION:
      return state
      .set("loading",action.loading)
    case DEL_CATE_AGRI_TECH_ACTION:
      return state
      .set("idDelCate",action.id)
      .set("loading",true)
    case DEL_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .set('listCateAgriTech', state.get('listCateAgriTech').filter((item) => { return item.id !== action.id}))
      .set("idDelCate",false)
      .set("loading",false)
    case DEL_CATE_AGRI_TECH_ACTION_FAIL:
      return state
      .set("idDelCate",false)
      .set("loading",false)
    case ADD_CATE_AGRI_TECH_ACTION:
      return state
      .set("nameCateAdd",action.nameCate)
      .set("loading",true)
    case ADD_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .update('listCateAgriTech', listCateAgriTech => listCateAgriTech.concat(action.cate))
      .set("nameCateAdd",false)
      .set("loading",false)
    case ADD_CATE_AGRI_TECH_ACTION_FAIL:
      return state
      .set("nameCateAdd",false)
      .set("loading",false)
    case GET_LIST_CATE_AGRI_TECH_ACTION:
      return state
      .set("listCateAgriTech",[])
      .set("loading",true)
    case GET_LIST_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .update('listCateAgriTech', listCateAgriTech => listCateAgriTech.concat(action.data))
      .set("loading",false)
    case GET_LIST_CATE_AGRI_TECH_ACTION_FAIL:
      return state
      .set("loading",false)
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default cateAgriTechReducer;
