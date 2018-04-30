
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_MP_ACTION,
  GET_LIST_MP_ACTION_SUCCESS,
  DEL_LIST_MP_ACTION,
  DEL_LIST_MP_ACTION_SUCCESS,
  ADD_LIST_MP_ACTION,
  ADD_LIST_MP_ACTION_SUCCESS,
} from './constants';

const initialState = fromJS({
  idCate: false,
  listMP: [],
  page: false,
  total: false,
  idDelNews: false,
  delNewsSuccess: false,
  addNews: {
    idCate: false,
    name: false,
    price: false,
    unit: false,
    place: false,
    note: false,
    errorCode: false,
  }
});

function listMarketPriceReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LIST_MP_ACTION:
      return state
      .setIn(['addNews', 'idCate'], action.idCate)
      .setIn(['addNews', 'name'], action.name)
      .setIn(['addNews', 'price'], action.price)
      .setIn(['addNews', 'unit'], action.unit)
      .setIn(['addNews', 'place'], action.place)
      .setIn(['addNews', 'note'], action.note)
      .setIn(['addNews', 'errorCode'], false)
    case ADD_LIST_MP_ACTION_SUCCESS:
      return state
      .update('listMP', listMP => [].concat(action.news).concat(listMP))
      .setIn(['addNews', 'idCate'], false)
      .setIn(['addNews', 'name'], false)
      .setIn(['addNews', 'price'], false)
      .setIn(['addNews', 'unit'], false)
      .setIn(['addNews', 'place'], false)
      .setIn(['addNews', 'note'], false)
      .setIn(['addNews', 'errorCode'], action.error)
    case DEL_LIST_MP_ACTION:
      return state
      .set("idDelNews",action.id)
      .set("delNewsSuccess",false)
    case DEL_LIST_MP_ACTION_SUCCESS:
      return state
      .set('listMP', state.get('listMP').filter((item) => { return item.id !== action.id}))
      .set("delNewsSuccess",true)
    case GET_LIST_MP_ACTION:
      return state
      .set("listMP",[])
      .set("idCate",action.id)
      .set("page",action.page)
    case GET_LIST_MP_ACTION_SUCCESS:
      return state
      .update('listMP', listMP => listMP.concat(action.listNews))
      .set("total",action.total)
      .set("idCate",false)
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default listMarketPriceReducer;
