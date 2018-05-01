import { createSelector } from 'reselect';

const selectListExpertDomain = () => (state) => state.get('listExpert');
const selectListField = () => createSelector(
  selectListExpertDomain(),
  (substate) => substate.get('listField')
);
const selectNameFieldAdd = () => createSelector(
  selectListExpertDomain(),
  (substate) => substate.get('nameFieldAdd')
);
const selectIdDelField = () => createSelector(
  selectListExpertDomain(),
  (substate) => substate.get('idDelField')
);
const selectErrorCode = () => createSelector(
  selectListExpertDomain(),
  (substate) => substate.get('errorCode')
);
const selectLoading = () => createSelector(
  selectListExpertDomain(),
  (substate) => substate.get('loading')
);
export {
  selectListExpertDomain,
  selectListField,
  selectNameFieldAdd,
  selectIdDelField,
  selectErrorCode,
  selectLoading,
};
