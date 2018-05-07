/*
 *
 * CateNewsEvent reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  ADD_CATE_NEWS_ACTION,
  ADD_CATE_NEWS_ACTION_SUCCESS,
  ADD_CATE_NEWS_ACTION_FAIL,
  GET_LIST_CATE_NEWS_ACTION,
  GET_LIST_CATE_NEWS_ACTION_SUCCESS,
  GET_LIST_CATE_NEWS_ACTION_FAIL,
  DEL_CATE_NEWS_ACTION,
  DEL_CATE_NEWS_ACTION_SUCCESS,
  DEL_CATE_NEWS_ACTION_FAIL,
} from './constants';

const initialState = fromJS({
  categoryNews:false,
  listcategorynews: [],
  idCateDel: false,
  loading: false,
});

function cateNewsEventReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADD_CATE_NEWS_ACTION:
      return state
      .set("categoryNews",action.categoryNews)
      .set("loading",true)
    case ADD_CATE_NEWS_ACTION_SUCCESS:
      return state
      .update('listcategorynews', listcategorynews => listcategorynews.concat(action.addCateNews))
      .set("loading",false)
    case ADD_CATE_NEWS_ACTION_FAIL:
      return state
      .set("categoryNews",false)
      .set("loading",false)
    case DEL_CATE_NEWS_ACTION:
      return state
      .set("idCateDel",action.id)
      .set("loading",true)
    case DEL_CATE_NEWS_ACTION_SUCCESS:
      return state
      .set('listcategorynews', state.get('listcategorynews').filter((item) => { return item.id !== action.id}))
      .set('idCateDel', false)
      .set("loading",false)
    case DEL_CATE_NEWS_ACTION_FAIL:
      return state
      .set('idCateDel', false)
      .set("loading",false)
    case GET_LIST_CATE_NEWS_ACTION:
      return state
      .set("listcategorynews",[])
      .set("loading",true)
    case GET_LIST_CATE_NEWS_ACTION_SUCCESS:
      return state
      .update('listcategorynews', listcategorynews => listcategorynews.concat(action.categoryNews))
      .set("loading",false)
    case GET_LIST_CATE_NEWS_ACTION_FAIL:
      return state
      .set("loading",false)
    default:
      return state;
  }
}

export default cateNewsEventReducer;
