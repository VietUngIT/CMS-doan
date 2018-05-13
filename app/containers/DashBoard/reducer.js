/*
 *
 * DashBoard reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_DASHBOARD_ACTION,
  GET_DASHBOARD_ACTION_SUCCESS,
  GET_DASHBOARD_ACTION_FAIL,
} from './constants';

const initialState = fromJS({
  loading: false,
  getSuccess: false,
  dashBoard: {
    numExpert: false,
    reportExpert: [],
    numUser: false,
    numQA: false,
    reportQA: [],
    numFRQS: false,
    reportFRQS: [],
    reportFRQSByDay: [],
    startTime: false,
    endTime: false,
  }
});

function dashBoardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD_ACTION:
      return state
      .setIn(['dashBoard', 'numExpert'], false)
      .setIn(['dashBoard', 'reportExpert'], [])
      .setIn(['dashBoard', 'numUser'], false)
      .setIn(['dashBoard', 'numQA'], false)
      .setIn(['dashBoard', 'reportQA'], [])
      .setIn(['dashBoard', 'numFRQS'], false)
      .setIn(['dashBoard', 'reportFRQS'], [])
      .setIn(['dashBoard', 'reportFRQSByDay'], [])
      .setIn(['dashBoard', 'startTime'], false)
      .setIn(['dashBoard', 'endTime'], false)
      .set("loading",true)
      .set("getSuccess",false)
    case GET_DASHBOARD_ACTION_SUCCESS:
      return state
      .setIn(['dashBoard', 'numExpert'], action.numExpert)
      .setIn(['dashBoard', 'reportExpert'], action.reportExpert)
      .setIn(['dashBoard', 'numUser'], action.numUser)
      .setIn(['dashBoard', 'numQA'], action.numQA)
      .setIn(['dashBoard', 'reportQA'], action.reportQA)
      .setIn(['dashBoard', 'numFRQS'], action.numFRQS)
      .setIn(['dashBoard', 'reportFRQS'], action.reportFRQS)
      .setIn(['dashBoard', 'reportFRQSByDay'],action.reportFRQSByDay)
      .setIn(['dashBoard', 'startTime'], action.startTime)
      .setIn(['dashBoard', 'endTime'], action.endTime)
      .set("loading",false)
      .set("getSuccess",true)
    case GET_DASHBOARD_ACTION_FAIL:
      return state
      .set("loading",false)
      .set("getSuccess",false)
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default dashBoardReducer;
