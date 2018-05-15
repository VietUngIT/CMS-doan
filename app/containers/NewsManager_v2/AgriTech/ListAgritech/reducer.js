
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_CATE_AGRI_TECH_ACTION,
  GET_LIST_CATE_AGRI_TECH_ACTION_SUCCESS,
  GET_LIST_AGRI_TECH_ACTION,
  GET_LIST_AGRI_TECH_ACTION_SUCCESS,
  GET_LIST_AGRI_TECH_ACTION_FAIL,
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION,
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
  DELETE_NEWS_AGRI_TECH_ACTION,
  DELETE_NEWS_AGRI_TECH_ACTION_SUCCESS,
  DELETE_NEWS_AGRI_TECH_ACTION_FAIL,
  ADD_NEWS_AGRI_TECH_ACTION,
  ADD_NEWS_AGRI_TECH_ACTION_SUCCESS,
  ADD_NEWS_AGRI_TECH_NOT_DATA_ACTION_SUCCESS,
  ADD_NEWS_AGRI_TECH_NOT_DATA_ACTION_FAIL,
  UPDATE_TAGS_AG_ACTION,
  UPDATE_TAGS_AG_ACTION_SUCCESS,
  UPDATE_TAGS_AG_ACTION_FAIL,
  UPDATE_IMAGE_NEWS_AG_ACTION,
  UPDATE_IMAGE_NEWS_AG_ACTION_SUCCESS,
  UPDATE_IMAGE_NEWS_AG_ACTION_FAIL,
  UPDATE_NEWS_AG_ACTION,
  UPDATE_NEWS_AG_ACTION_SUCCESS,
  UPDATE_NEWS_AG_ACTION_FAIL,
} from './constants';

const initialState = fromJS({
  listNewsAgriTech: [],
  listSubCate: [],
  listCateAgriTech: [],
  idSubCate: false,
  total: false,
  page: false,
  idCate: false,
  idDelNews: false,
  delNewsSuccess: false,
  loading: false,
  tagsUpdate: [],
  idNewsAGEdit: false,
  imageUpdateAG: false,
  addNews: {
    idSubCateLink: false,
    title: false,
    author: false,
    image: false,
    tags: false,
    idsubcate: false,
    content: false,
    errorCode: false,
  },
  editNews: {
    idnews: false,
    title: false,
    author: false,
    idsubcate: false,
    content: false,
  }
});

function listAgritechReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NEWS_AG_ACTION:
      return state
      .setIn(['editNews', 'idnews'], action.idnews)
      .setIn(['editNews', 'title'], action.title)
      .setIn(['editNews', 'author'], action.author)
      .setIn(['editNews', 'idsubcate'], action.idsubcate)
      .setIn(['editNews', 'content'], action.content)
      .set("loading",true)
    case UPDATE_NEWS_AG_ACTION_SUCCESS:
      return state
      .set('listNewsAgriTech', state.get('listNewsAgriTech').map((item) => { return item.id === action.data.id ? action.data : item;}))
      .setIn(['editNews', 'idnews'], false)
      .setIn(['editNews', 'title'], false)
      .setIn(['editNews', 'author'], false)
      .setIn(['editNews', 'idsubcate'], false)
      .setIn(['editNews', 'content'], false)
      .set("loading",false)
    case UPDATE_NEWS_AG_ACTION_FAIL:
      return state
      .setIn(['editNews', 'idnews'], false)
      .setIn(['editNews', 'title'], false)
      .setIn(['editNews', 'author'], false)
      .setIn(['editNews', 'idsubcate'], false)
      .setIn(['editNews', 'content'], false)
      .set("loading",false)
    case UPDATE_IMAGE_NEWS_AG_ACTION:
      return state
      .set("loading",true)
      .set("imageUpdateAG",action.image)
      .set("idNewsAGEdit",action.id)
    case UPDATE_IMAGE_NEWS_AG_ACTION_SUCCESS:
      return state
      .set('listNewsAgriTech', state.get('listNewsAgriTech').map((item) => { return item.id === action.data.id ? action.data : item;}))
      .set("loading",false)
      .set("imageUpdateAG",false)
      .set("idNewsAGEdit",false)
    case UPDATE_IMAGE_NEWS_AG_ACTION_FAIL:
      return state
      .set("loading",false)
      .set("imageUpdateAG",false)
      .set("idNewsAGEdit",false)
    case UPDATE_TAGS_AG_ACTION:
      return state
      .set("loading",true)
      .set("tagsUpdate",action.tags)
      .set("idNewsAGEdit",action.id)
    case UPDATE_TAGS_AG_ACTION_SUCCESS:
      return state
      .set('listNewsAgriTech', state.get('listNewsAgriTech').map((item) => { return item.id === action.data.id ? action.data : item;}))
      .set("loading",false)
      .set("tagsUpdate",[])
      .set("idNewsAGEdit",false)
    case UPDATE_TAGS_AG_ACTION_FAIL:
      return state
      .set("loading",false)
      .set("tagsUpdate",[])
      .set("idNewsAGEdit",false)
    case DELETE_NEWS_AGRI_TECH_ACTION:
      return state
      .set("idDelNews",action.id)
      .set("delNewsSuccess",false)
      .set("loading",true)
    case DELETE_NEWS_AGRI_TECH_ACTION_SUCCESS:
      return state
      .set('listNewsAgriTech', state.get('listNewsAgriTech').filter((item) => { return item.id !== action.id}))
      .set("delNewsSuccess",true)
      .set("loading",false)
    case DELETE_NEWS_AGRI_TECH_ACTION_FAIL:
      return state
      .set("delNewsSuccess",false)
      .set("loading",false)
    case ADD_NEWS_AGRI_TECH_ACTION:
      return state
      .setIn(['addNews', 'idSubCateLink'], action.idSubCateLink)
      .setIn(['addNews', 'title'], action.title)
      .setIn(['addNews', 'author'], action.author)
      .setIn(['addNews', 'image'], action.image)
      .setIn(['addNews', 'tags'], action.tags)
      .setIn(['addNews', 'idsubcate'], action.idsubcate)
      .setIn(['addNews', 'content'], action.content)
      .setIn(['addNews', 'errorCode'], false)
      .set("loading", true)
    case ADD_NEWS_AGRI_TECH_ACTION_SUCCESS:
      return state
      .update('listNewsAgriTech', listNewsAgriTech => [].concat(action.news).concat(listNewsAgriTech))
      .setIn(['addNews', 'idSubCateLink'], false)
      .setIn(['addNews', 'title'], false)
      .setIn(['addNews', 'author'], false)
      .setIn(['addNews', 'image'], false)
      .setIn(['addNews', 'tags'], false)
      .setIn(['addNews', 'idsubcate'], false)
      .setIn(['addNews', 'content'], false)
      .setIn(['addNews', 'errorCode'], action.error)
      .set("loading", false)
    case ADD_NEWS_AGRI_TECH_NOT_DATA_ACTION_SUCCESS:
      return state
      .setIn(['addNews', 'idSubCateLink'], false)
      .setIn(['addNews', 'title'], false)
      .setIn(['addNews', 'author'], false)
      .setIn(['addNews', 'image'], false)
      .setIn(['addNews', 'tags'], false)
      .setIn(['addNews', 'idsubcate'], false)
      .setIn(['addNews', 'content'], false)
      .setIn(['addNews', 'errorCode'], action.error)
      .set("loading", false)
    case ADD_NEWS_AGRI_TECH_NOT_DATA_ACTION_FAIL:
      return state
      .setIn(['addNews', 'idSubCateLink'], false)
      .setIn(['addNews', 'title'], false)
      .setIn(['addNews', 'author'], false)
      .setIn(['addNews', 'image'], false)
      .setIn(['addNews', 'tags'], false)
      .setIn(['addNews', 'idsubcate'], false)
      .setIn(['addNews', 'content'], false)
      .setIn(['addNews', 'errorCode'], action.error)
      .set("loading", false)
    case GET_LIST_CATE_AGRI_TECH_ACTION:
      return state
      .set("listCateAgriTech",[])
    case GET_LIST_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .update('listCateAgriTech', listCateAgriTech => listCateAgriTech.concat(action.data))
    case GET_LIST_SUB_CATE_AGRI_TECH_ACTION:
      return state
      .set("listSubCate",[])
      .set("idCate",action.id)
    case GET_LIST_SUB_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .update('listSubCate', listSubCate => listSubCate.concat(action.data))
      .set("idCate",false)
    case GET_LIST_AGRI_TECH_ACTION:
      return state
      .set("listNewsAgriTech",[])
      .set("idSubCate",action.id)
      .set("page",action.page)
      .set("loading",true)
    case GET_LIST_AGRI_TECH_ACTION_SUCCESS:
      return state
      .update('listNewsAgriTech', listNewsAgriTech => listNewsAgriTech.concat(action.listNews))
      .set("total",action.total)
      .set("idSubCate",false)
      .set("loading",false)
    case GET_LIST_AGRI_TECH_ACTION_FAIL:
      return state
      .set("idSubCate",false)
      .set("loading",false)
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default listAgritechReducer;
