
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_INFO_ADMIN_ACTION,
  GET_INFO_ADMIN_ACTION_SUCCESS,
  CHANGE_NAME_ACTION,
  CHANGE_NAME_ACTION_SUCCESS,
  CHANGE_PHONE_ACTION,
  CHANGE_PHONE_ACTION_SUCCESS,
  CHANGE_ADDRESS_ACTION,
  CHANGE_ADDRESS_ACTION_SUCCESS,
  CHANGE_AVATAR_ACTION,
  SUBMIT_CHANGE_AVATAR_ACTION,
  CHANGE_AVATAR_ACTION_SUCCESS,
  CHANGE_PASS_ACTION,
  CHANGE_PASS_ACTION_SUCCESS,
  GET_INFO_ADMIN_ACTION_FAIL,
  CHANGE_NAME_ACTION_FAIL,
  CHANGE_PHONE_ACTION_FAIL,
  CHANGE_ADDRESS_ACTION_FAIL,
  CHANGE_AVATAR_ACTION_FAIL,
  CHANGE_PASS_ACTION_FAIL,
} from './constants';

const initialState = fromJS({
  name: false,
  newPhone: false,
  address: false,
  avatar: false,
  oldPass: false,
  newPass: false,
  user: false,
  loading: false,
});

function infoAdminReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_INFO_ADMIN_ACTION:
      return state
      .set("loading",true)
    case GET_INFO_ADMIN_ACTION_SUCCESS:
      return state
      .set('user',action.user)
      .set("loading",false)
    case GET_INFO_ADMIN_ACTION_FAIL:
      return state
      .set("loading",false)
    case CHANGE_NAME_ACTION:
      return state
      .set('name',action.name)
      .set("loading",true)
    case CHANGE_NAME_ACTION_SUCCESS:
      return state
      .set('user',action.user)
      .set("loading",false)
    case CHANGE_NAME_ACTION_FAIL:
      return state
      .set("loading",false)
    case CHANGE_PHONE_ACTION:
      return state
      .set('newPhone',action.newPhone)
      .set("loading",true)
    case CHANGE_PHONE_ACTION_SUCCESS:
      return state
      .set('user',action.user)
      .set("loading",false)
    case CHANGE_PHONE_ACTION_FAIL:
      return state
      .set("loading",false)
    case CHANGE_ADDRESS_ACTION:
      return state
      .set('address',action.address)
      .set("loading",true)
    case CHANGE_ADDRESS_ACTION_SUCCESS:
      return state
      .set('user',action.user)
      .set("loading",false)
    case CHANGE_ADDRESS_ACTION_FAIL:
      return state
      .set("loading",false)
    case CHANGE_AVATAR_ACTION:
      return state
      .set('avatar',action.avatar)
    case SUBMIT_CHANGE_AVATAR_ACTION:
      return state
      .set("loading",true)
    case CHANGE_AVATAR_ACTION_SUCCESS:
      return state
      .set('user',action.user)
      .set("loading",false)
    case CHANGE_AVATAR_ACTION_FAIL:
      return state
      .set("loading",false)
    case CHANGE_PASS_ACTION:
      return state
      .set('oldPass',action.oldPass)
      .set('newPass',action.newPass)
      .set("loading",true)
    case CHANGE_PASS_ACTION_SUCCESS:
      return state
      .set('user',action.user)
      .set("loading",false)
    case CHANGE_PASS_ACTION_FAIL:
      return state
      .set("loading",false)
    default:
      return state;
  }
}

export default infoAdminReducer;
