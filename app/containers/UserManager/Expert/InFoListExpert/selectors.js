import { createSelector } from 'reselect';

const selectInFoListExpertDomain = () => (state) => state.get('inFoListExpert');
const selectListExpert = () => createSelector(
  selectInFoListExpertDomain(),
  (substate) => substate.get('listExpert')
);
const selectPageListExpert = () => createSelector(
  selectInFoListExpertDomain(),
  (substate) => substate.get('page')
);
const selectTotalItemListExpert = () => createSelector(
  selectInFoListExpertDomain(),
  (substate) => substate.get('total')
);
const selectLoading = () => createSelector(
  selectInFoListExpertDomain(),
  (substate) => substate.get('isLoading')
);
const selectidFieldGetExpert = () => createSelector(
  selectInFoListExpertDomain(),
  (substate) => substate.get('idField')
);
const selectExpertAdd = () => createSelector(
  selectInFoListExpertDomain(),
  (substate) => substate.get("expertAdd")
);
const selectErrorCode = () => createSelector(
  selectInFoListExpertDomain(),
  (substate) => substate.getIn(['expertAdd','errorcode'])
);
export {
  selectInFoListExpertDomain,
  selectListExpert,
  selectPageListExpert,
  selectTotalItemListExpert,
  selectLoading,
  selectidFieldGetExpert,
  selectExpertAdd,
  selectErrorCode,
};
