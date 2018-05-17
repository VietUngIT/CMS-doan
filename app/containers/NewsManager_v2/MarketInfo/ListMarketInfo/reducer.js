/*
 *
 * ListMarketInfo reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_MK_ACTION,
  GET_LIST_MK_ACTION_SUCCESS,
  GET_LIST_MK_ACTION_FAIL,
  GET_LIST_CATE_MK_ACTION,
  GET_LIST_CATE_MK_ACTION_SUCCESS,
  DELETE_NEWS_MK_ACTION,
  DELETE_NEWS_MK_ACTION_SUCCESS,
  ADD_NEWS_MK_ACTION,
  ADD_NEWS_MK_ACTION_SUCCESS,
  ADD_NEWS_MK_NOT_DATA_ACTION_SUCCESS,
  ADD_NEWS_MK_NOT_DATA_ACTION_FAIL,
  DELETE_NEWS_MK_ACTION_FAIL,
  UPDATE_TAGS_MK_ACTION,
  UPDATE_TAGS_MK_ACTION_SUCCESS,
  UPDATE_TAGS_MK_ACTION_FAIL,
  UPDATE_IMAGE_NEWS_MK_ACTION,
  UPDATE_IMAGE_NEWS_MK_ACTION_SUCCESS,
  UPDATE_IMAGE_NEWS_MK_ACTION_FAIL,
  UPDATE_NEWS_MK_ACTION,
  UPDATE_NEWS_MK_ACTION_SUCCESS,
  UPDATE_NEWS_MK_ACTION_FAIL,
  GET_COMMENT_NEWS_MK_ACTION,
  GET_COMMENT_NEWS_MK_ACTION_SUCCESS,
  GET_COMMENT_NEWS_MK_ACTION_FAIL,
  DEL_COMMENT_NEWS_MK_ACTION,
  DEL_COMMENT_NEWS_MK_ACTION_SUCCESS,
  DEL_COMMENT_NEWS_MK_ACTION_FAIL,
} from './constants';

const initialState = fromJS({
  listNewsMK: [],
  listcatenewsMK: [],
  idCate: false,
  total: false,
  page: false,
  idDelMK: false,
  delNewsSuccess: false,
  loading: false,
  tagsUpdate: [],
  idNewsMKEdit: false,
  imageUpdateMK: false,
  addNews: {
    idCateLink: false,
    title: false,
    author: false,
    image: false,
    source: false,
    tags: false,
    idcate: false,
    content: false,
    errorCode: false,
  },
  editNews: {
    idnews: false,
    title: false,
    author: false,
    source: false,
    idcate: false,
    content: false,
  },
  comment: [],
  idNewsGetComment: false,
  loadingComment: false,
  pageComment: 0,
  totalComment: 0,
  idCommentDel: false,
  idNewsToCommentDel: false,
});

function listMarketInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEL_COMMENT_NEWS_MK_ACTION:
      return state
      .set("idCommentDel",action.id)
      .set("idNewsToCommentDel",action.idNews)
      .set("loading",true)
    case DEL_COMMENT_NEWS_MK_ACTION_SUCCESS:
      return state
      .set('comment', state.get('comment').filter((item) => { return item._id !== action.id}))
      .set("totalComment",state.get("totalComment")-1)
      .set('listNewsMK', state.get('listNewsMK').map((item) => { return Object.assign({},item,{comments:item.id===action.idNewsToCommentDel?item.comments-1:item.comments}) }))
      .set("pageComment",(state.get("totalComment")-1)%4===0?(state.get("pageComment")-1)>0?(state.get("pageComment")-1):0:state.get("pageComment"))
      .set("idNewsToCommentDel",false)
      .set("loading",false)
    case DEL_COMMENT_NEWS_MK_ACTION_FAIL:
      return state
      .set("idNewsToCommentDel",false)
      .set("idCommentDel",false)
      .set("loading",false)
    case GET_COMMENT_NEWS_MK_ACTION:
      return state
      .set("idNewsGetComment",action.id)
      .set("pageComment",action.page)
      .set("totalComment",action.page===0?0:state.get("totalComment"))
      .set("loadingComment",true)
    case GET_COMMENT_NEWS_MK_ACTION_SUCCESS:
      return state
      .update('comment', comment => comment.concat(action.data))
      .set("totalComment",action.total)
      .set("idNewsGetComment",false)
      .set("loadingComment",false)
    case GET_COMMENT_NEWS_MK_ACTION_FAIL:
      return state
      .set("idNewsGetComment",false)
      .set("loadingComment",false)
    case UPDATE_NEWS_MK_ACTION:
      return state
      .setIn(['editNews', 'idnews'], action.idnews)
      .setIn(['editNews', 'title'], action.title)
      .setIn(['editNews', 'author'], action.author)
      .setIn(['editNews', 'source'], action.source)
      .setIn(['editNews', 'idcate'], action.idcate)
      .setIn(['editNews', 'content'], action.content)
      .set("loading",true)
    case UPDATE_NEWS_MK_ACTION_SUCCESS:
      return state
      .set('listNewsMK', state.get('listNewsMK').map((item) => { return item.id === action.data.id ? action.data : item;}))
      .setIn(['editNews', 'idnews'], false)
      .setIn(['editNews', 'title'], false)
      .setIn(['editNews', 'author'], false)
      .setIn(['editNews', 'source'], false)
      .setIn(['editNews', 'idcate'], false)
      .setIn(['editNews', 'content'], false)
      .set("loading",false)
    case UPDATE_NEWS_MK_ACTION_FAIL:
      return state
      .setIn(['editNews', 'idnews'], false)
      .setIn(['editNews', 'title'], false)
      .setIn(['editNews', 'author'], false)
      .setIn(['editNews', 'source'], false)
      .setIn(['editNews', 'idcate'], false)
      .setIn(['editNews', 'content'], false)
      .set("loading",false)
    case UPDATE_IMAGE_NEWS_MK_ACTION:
      return state
      .set("loading",true)
      .set("imageUpdateMK",action.image)
      .set("idNewsMKEdit",action.id)
    case UPDATE_IMAGE_NEWS_MK_ACTION_SUCCESS:
      return state
      .set('listNewsMK', state.get('listNewsMK').map((item) => { return item.id === action.data.id ? action.data : item;}))
      .set("loading",false)
      .set("imageUpdateMK",false)
      .set("idNewsMKEdit",false)
    case UPDATE_IMAGE_NEWS_MK_ACTION_FAIL:
      return state
      .set("loading",false)
      .set("imageUpdateMK",false)
      .set("idNewsMKEdit",false)
    case UPDATE_TAGS_MK_ACTION:
      return state
      .set("loading",true)
      .set("tagsUpdate",action.tags)
      .set("idNewsMKEdit",action.id)
    case UPDATE_TAGS_MK_ACTION_SUCCESS:
      return state
      .set('listNewsMK', state.get('listNewsMK').map((item) => { return item.id === action.data.id ? action.data : item;}))
      .set("loading",false)
      .set("tagsUpdate",[])
      .set("idNewsMKEdit",false)
    case UPDATE_TAGS_MK_ACTION_FAIL:
      return state
      .set("loading",false)
      .set("tagsUpdate",[])
      .set("idNewsMKEdit",false)
    case ADD_NEWS_MK_ACTION:
      return state
      .setIn(['addNews', 'idCateLink'], action.idCateLink)
      .setIn(['addNews', 'title'], action.title)
      .setIn(['addNews', 'author'], action.author)
      .setIn(['addNews', 'image'], action.image)
      .setIn(['addNews', 'source'], action.source)
      .setIn(['addNews', 'tags'], action.tags)
      .setIn(['addNews', 'idcate'], action.idcate)
      .setIn(['addNews', 'content'], action.content)
      .setIn(['addNews', 'errorCode'], false)
      .set("loading",true)
    case ADD_NEWS_MK_ACTION_SUCCESS:
      return state
      .update('listNewsMK', listNewsMK => [].concat(action.news).concat(listNewsMK))
      .setIn(['addNews', 'idCateLink'], false)
      .setIn(['addNews', 'title'], false)
      .setIn(['addNews', 'author'], false)
      .setIn(['addNews', 'image'], false)
      .setIn(['addNews', 'source'], false)
      .setIn(['addNews', 'tags'], false)
      .setIn(['addNews', 'idcate'], false)
      .setIn(['addNews', 'content'], false)
      .setIn(['addNews', 'errorCode'], action.error)
      .set("loading",false)
    case ADD_NEWS_MK_NOT_DATA_ACTION_SUCCESS:
      return state
      .setIn(['addNews', 'idCateLink'], false)
      .setIn(['addNews', 'title'], false)
      .setIn(['addNews', 'author'], false)
      .setIn(['addNews', 'image'], false)
      .setIn(['addNews', 'source'], false)
      .setIn(['addNews', 'tags'], false)
      .setIn(['addNews', 'idcate'], false)
      .setIn(['addNews', 'content'], false)
      .setIn(['addNews', 'errorCode'], action.error)
      .set("loading",false)
    case ADD_NEWS_MK_NOT_DATA_ACTION_FAIL:
      return state
      .setIn(['addNews', 'idCateLink'], false)
      .setIn(['addNews', 'title'], false)
      .setIn(['addNews', 'author'], false)
      .setIn(['addNews', 'image'], false)
      .setIn(['addNews', 'source'], false)
      .setIn(['addNews', 'tags'], false)
      .setIn(['addNews', 'idcate'], false)
      .setIn(['addNews', 'content'], false)
      .setIn(['addNews', 'errorCode'], action.error)
      .set("loading",false)
    case DELETE_NEWS_MK_ACTION:
      return state
      .set("idDelMK",action.id)
      .set("delNewsSuccess",false)
      .set("loading",true)
    case DELETE_NEWS_MK_ACTION_SUCCESS:
      return state
      .set('listNewsMK', state.get('listNewsMK').filter((item) => { return item.id !== action.id}))
      .set("idDelMK",false)
      .set("delNewsSuccess",true)
      .set("loading",false)
    case DELETE_NEWS_MK_ACTION_FAIL:
      return state
      .set("idDelMK",false)
      .set("delNewsSuccess",true)
      .set("loading",false)
    case GET_LIST_MK_ACTION:
      return state
      .set("listNewsMK",[])
      .set("idCate",action.idcate)
      .set("page",action.page)
      .set("loading",true)
    case GET_LIST_MK_ACTION_SUCCESS:
      return state
      .update('listNewsMK', listNewsMK => listNewsMK.concat(action.listNews))
      .set("total",action.total)
      .set("idCate",false)
      .set("loading",false)
    case GET_LIST_MK_ACTION_FAIL:
      return state
      .set("idCate",false)
      .set("loading",false)
    case GET_LIST_CATE_MK_ACTION:
      return state
      .set("listcatenewsMK",[])
    case GET_LIST_CATE_MK_ACTION_SUCCESS:
      return state
      .update('listcatenewsMK', listcatenewsMK => listcatenewsMK.concat(action.categoryNews))
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default listMarketInfoReducer;
