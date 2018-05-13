/*
 *
 * DashBoard actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_DASHBOARD_ACTION,
  GET_DASHBOARD_ACTION_SUCCESS,
  GET_DASHBOARD_ACTION_FAIL,
} from './constants';

export function getDashBoard() {
  return {
    type: GET_DASHBOARD_ACTION,
  };
}
export function getDashBoardSuccess(numExpert,reportExpert,numUser,numQA,reportQA,numFRQS,reportFRQS,reportFRQSByDay,startTime,endTime) {
  return {
    type: GET_DASHBOARD_ACTION_SUCCESS,
    numExpert,
    reportExpert,
    numUser,
    numQA,
    reportQA,
    numFRQS,
    reportFRQS,
    reportFRQSByDay,
    startTime,
    endTime,
  };
}
export function getDashBoardFail() {
  return {
    type: GET_DASHBOARD_ACTION_FAIL,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
