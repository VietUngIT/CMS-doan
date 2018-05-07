/*
 *
 * ListNewsEvent reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_NEWS_ACTION,
  GET_LIST_NEWS_ACTION_SUCCESS,
  GET_LIST_NEWS_ACTION_FAIL,
  DELETE_NEWS_ACTION,
  DELETE_NEWS_ACTION_SUCCESS,
  DELETE_NEWS_ACTION_FAIL,
  ADD_NEWS_ACTION,
  ADD_NEWS_ACTION_SUCCESS,
  ADD_NEWS_NOT_DATA_ACTION_SUCCESS,
  GET_LIST_CATE_ACTION,
  GET_LIST_CATE_ACTION_SUCCESS,
  ADD_NEWS_NOT_DATA_ACTION_FAIL,
} from './constants';

const initialState = fromJS({
  listNews:[],
  listcatenews: [],
  page: 0,
  total: 0,
  idCate: false,
  idNewsDel: false,
  delNewsSuccess: false,
  loading: false,
  addNews: {
    idCateLink: false,
    title: false,
    shortDesc: false,
    author: false,
    image: false,
    source: false,
    tags: false,
    idcate: false,
    content: false,
    errorCode: false,
  }
});

function listNewsEventReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_CATE_ACTION:
      return state
      .set("listcatenews",[])
    case GET_LIST_CATE_ACTION_SUCCESS:
      return state
      .update('listcatenews', listcatenews => listcatenews.concat(action.categoryNews))
    case ADD_NEWS_ACTION:
      return state
      .setIn(['addNews', 'idCateLink'], action.idCateLink)
      .setIn(['addNews', 'title'], action.title)
      .setIn(['addNews', 'shortDesc'], action.shortDesc)
      .setIn(['addNews', 'author'], action.author)
      .setIn(['addNews', 'image'], action.image)
      .setIn(['addNews', 'source'], action.source)
      .setIn(['addNews', 'tags'], action.tags)
      .setIn(['addNews', 'idcate'], action.idcate)
      .setIn(['addNews', 'content'], action.content)
      .setIn(['addNews', 'errorCode'], false)
      .set("loading",true)
    case ADD_NEWS_ACTION_SUCCESS:
      return state
      .update('listNews', listNews => [].concat(action.news).concat(listNews))
      .setIn(['addNews', 'idCateLink'], false)
      .setIn(['addNews', 'title'], false)
      .setIn(['addNews', 'shortDesc'], false)
      .setIn(['addNews', 'author'], false)
      .setIn(['addNews', 'image'], false)
      .setIn(['addNews', 'source'], false)
      .setIn(['addNews', 'tags'], false)
      .setIn(['addNews', 'idcate'], false)
      .setIn(['addNews', 'content'], false)
      .setIn(['addNews', 'errorCode'], action.error)
      .set("loading",false)
    case ADD_NEWS_NOT_DATA_ACTION_SUCCESS:
      return state
      .setIn(['addNews', 'idCateLink'], false)
      .setIn(['addNews', 'title'], false)
      .setIn(['addNews', 'shortDesc'], false)
      .setIn(['addNews', 'author'], false)
      .setIn(['addNews', 'image'], false)
      .setIn(['addNews', 'source'], false)
      .setIn(['addNews', 'tags'], false)
      .setIn(['addNews', 'idcate'], false)
      .setIn(['addNews', 'content'], false)
      .setIn(['addNews', 'errorCode'], action.error)
      .set("loading",false)
    case ADD_NEWS_NOT_DATA_ACTION_FAIL:
      return state
      .setIn(['addNews', 'idCateLink'], false)
      .setIn(['addNews', 'title'], false)
      .setIn(['addNews', 'shortDesc'], false)
      .setIn(['addNews', 'author'], false)
      .setIn(['addNews', 'image'], false)
      .setIn(['addNews', 'source'], false)
      .setIn(['addNews', 'tags'], false)
      .setIn(['addNews', 'idcate'], false)
      .setIn(['addNews', 'content'], false)
      .setIn(['addNews', 'errorCode'], action.error)
      .set("loading",false)
    case GET_LIST_NEWS_ACTION:
      return state
      .set("listNews",[])
      .set("idCate",action.idcate)
      .set("page",action.page)
      .set("loading",true)
    case GET_LIST_NEWS_ACTION_SUCCESS:
      return state
      .update('listNews', listNews => listNews.concat(action.listNews))
      .set("total",action.total)
      .set("idCate",false)
      .set("loading",false)
    case GET_LIST_NEWS_ACTION_FAIL:
      return state
      .set("idCate",false)
      .set("loading",false)
    case DELETE_NEWS_ACTION:
      return state
      .set("idNewsDel",action.id)
      .set("delNewsSuccess",false)
      .set("loading",true)
    case DELETE_NEWS_ACTION_SUCCESS:
      return state
      .set('listNews', state.get('listNews').filter((item) => { return item.id !== action.id}))
      .set("delNewsSuccess",true)
      .set("loading",false)
    case DELETE_NEWS_ACTION_FAIL:
      return state
      .set("delNewsSuccess",true)
      .set("idNewsDel",false)
      .set("loading",false)
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default listNewsEventReducer;
