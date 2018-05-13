import { createSelector } from 'reselect';
const selectDashBoardDomain = () => (state) => state.get('dashBoard');

const selectNumExpert = () => createSelector(
  selectDashBoardDomain(),
  (substate) => substate.getIn(['dashBoard','numExpert'])
);
const selectReportExpert = () => createSelector(
  selectDashBoardDomain(),
  (substate) => substate.getIn(['dashBoard','reportExpert'])
);
const selectNumUser = () => createSelector(
  selectDashBoardDomain(),
  (substate) => substate.getIn(['dashBoard','numUser'])
);
const selectNumQA = () => createSelector(
  selectDashBoardDomain(),
  (substate) => substate.getIn(['dashBoard','numQA'])
);
const selectReportQA = () => createSelector(
  selectDashBoardDomain(),
  (substate) => substate.getIn(['dashBoard','reportQA'])
);
const selectNumFRQS = () => createSelector(
  selectDashBoardDomain(),
  (substate) => substate.getIn(['dashBoard','numFRQS'])
);
const selectReportFRQS = () => createSelector(
  selectDashBoardDomain(),
  (substate) => substate.getIn(['dashBoard','reportFRQS'])
);
const selectReportFRQSByDay = () => createSelector(
  selectDashBoardDomain(),
  (substate) => substate.getIn(['dashBoard','reportFRQSByDay'])
);
const selectStartTime = () => createSelector(
  selectDashBoardDomain(),
  (substate) => substate.getIn(['dashBoard','startTime'])
);
const selectEndTime = () => createSelector(
  selectDashBoardDomain(),
  (substate) => substate.getIn(['dashBoard','endTime'])
);
const selectLoading = () => createSelector(
  selectDashBoardDomain(),
  (substate) => substate.get("loading")
);
const selectgetSuccess = () => createSelector(
  selectDashBoardDomain(),
  (substate) => substate.get("getSuccess")
);
export {
  selectDashBoardDomain,
  selectNumExpert,
  selectReportExpert,
  selectNumUser,
  selectNumQA,
  selectReportQA,
  selectNumFRQS,
  selectReportFRQS,
  selectReportFRQSByDay,
  selectLoading,
  selectgetSuccess,
  selectStartTime,
  selectEndTime,
};
