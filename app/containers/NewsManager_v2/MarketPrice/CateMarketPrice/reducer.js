
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_CATE_ACTION,
  GET_CATE_ACTION_SUCCESS,
  GET_CATE_ACTION_FAIL,
  ADD_CATE_ACTION,
  ADD_CATE_ACTION_SUCCESS,
  ADD_CATE_ACTION_FAIL,
  DELETE_CATE_ACTION,
  DELETE_CATE_ACTION_SUCCESS,
  DELETE_CATE_ACTION_FAIL,
  LOADING_ACTION,
} from './constants';

const initialState = fromJS({
  listCateMP: [],
  nameCateAdd: false,
  image: false,
  errorCode: false,
  idDelCate: false,
  loading: false,
});

function cateMarketPriceReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_ACTION:
      return state
      .set("loading",action.loading)
    case GET_CATE_ACTION:
      return state
      .set("listCateMP",[])
      .set("loading",true)
    case GET_CATE_ACTION_SUCCESS:
      return state
      .update('listCateMP', listCateMP => listCateMP.concat(action.data))
      .set("loading",false)
    case GET_CATE_ACTION_FAIL:
      return state
      .set("loading",false)
    case DELETE_CATE_ACTION:
      return state
      .set("idDelCate",action.id)
      .set("loading",true)
    case DELETE_CATE_ACTION_SUCCESS:
      return state
      .set('listCateMP', state.get('listCateMP').filter((item) => { return item.id !== action.id}))
      .set("idDelCate",false)
      .set("loading",false)
    case DELETE_CATE_ACTION_FAIL:
      return state
      .set("idDelCate",false)
      .set("loading",false)
    case ADD_CATE_ACTION:
      return state
      .set("nameCateAdd",action.nameCate)
      .set("image",action.image)
      .set("errorCode",false)
      .set("loading",true)
    case ADD_CATE_ACTION_SUCCESS:
      return state
      .update('listCateMP', listCateMP => listCateMP.concat(action.cate))
      .set("nameCateAdd",false)
      .set("image",false)
      .set("errorCode",action.error)
      .set("loading",false)
    case ADD_CATE_ACTION_FAIL:
      return state
      .set("nameCateAdd",false)
      .set("image",false)
      .set("errorCode",action.error)
      .set("loading",false)
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default cateMarketPriceReducer;
