import { createSelector } from 'reselect';

const selectQainfoDomain = () => (state) => state.get('qainfo');

const selectListField = () => createSelector(
  selectQainfoDomain(),
  (substate) => substate.get('listField')
);
const selectLoading = () => createSelector(
  selectQainfoDomain(),
  (substate) => substate.get('loading')
);
const selectListQA = () => createSelector(
  selectQainfoDomain(),
  (substate) => substate.get('listQA')
);
const selectIdField = () => createSelector(
  selectQainfoDomain(),
  (substate) => substate.get('idField')
);
const selectTotal = () => createSelector(
  selectQainfoDomain(),
  (substate) => substate.get('total')
);
const selectPage = () => createSelector(
  selectQainfoDomain(),
  (substate) => substate.get('page')
);
export {
  selectQainfoDomain,
  selectListField,
  selectLoading,
  selectListQA,
  selectIdField,
  selectTotal,
  selectPage,
};
