/*
 *
 * CateMarketInfo reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_CATE_NEWS_MK_ACTION,
  GET_LIST_CATE_NEWS_MK_ACTION_SUCCESS,
  GET_LIST_CATE_NEWS_MK_ACTION_FAIL,
  ADD_CATE_NEWS_MK_ACTION,
  ADD_CATE_NEWS_MK_ACTION_SUCCESS,
  ADD_CATE_NEWS_MK_ACTION_FAIL,
  DEL_CATE_NEWS_MK_ACTION,
  DEL_CATE_NEWS_MK_ACTION_SUCCESS,
  DEL_CATE_NEWS_MK_ACTION_FAIL,
} from './constants';

const initialState = fromJS({
  listCateMK: [],
  nameCateAdd: false,
  idCateDel: false,
  loading: false,
});

function cateMarketInfoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CATE_NEWS_MK_ACTION:
      return state
      .set("nameCateAdd",action.nameCate)
      .set("loading",true)
    case ADD_CATE_NEWS_MK_ACTION_SUCCESS:
      return state
      .update('listCateMK', listCateMK => listCateMK.concat(action.cate))
      .set("nameCateAdd",false)
      .set("loading",false)
    case ADD_CATE_NEWS_MK_ACTION_FAIL:
      return state
      .set("nameCateAdd",false)
      .set("loading",false)
    case DEL_CATE_NEWS_MK_ACTION:
      return state
      .set("idCateDel",action.id)
      .set("loading",true)
    case DEL_CATE_NEWS_MK_ACTION_SUCCESS:
      return state
      .set('listCateMK', state.get('listCateMK').filter((item) => { return item.id !== action.id}))
      .set("idCateDel",false)
      .set("loading",false)
    case DEL_CATE_NEWS_MK_ACTION_FAIL:
      return state
      .set("idCateDel",false)
      .set("loading",false)
    case GET_LIST_CATE_NEWS_MK_ACTION:
      return state
      .set("listCateMK",[])
      .set("loading",true)
    case GET_LIST_CATE_NEWS_MK_ACTION_SUCCESS:
      return state
      .update('listCateMK', listCateMK => listCateMK.concat(action.cateMK))
      .set("loading",false)
    case GET_LIST_CATE_NEWS_MK_ACTION_FAIL:
      return state
      .set("loading",false)
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default cateMarketInfoReducer;
