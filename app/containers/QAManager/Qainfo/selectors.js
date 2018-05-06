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
const selectError = () => createSelector(
  selectQainfoDomain(),
  (substate) => substate.getIn(['addQA','errorCode'])
);
const selectQAAdd = () => createSelector(
  selectQainfoDomain(),
  (substate) => substate.get('addQA')
);
const selectIdFieldPage = () => createSelector(
  selectQainfoDomain(),
  (substate) => substate.getIn(['addQA','idFieldSelect'])
);
const selectQADetail = () => createSelector(
  selectQainfoDomain(),
  (substate) => substate.get("qaDetail")
);
const selectIdQADel = () => createSelector(
  selectQainfoDomain(),
  (substate) => substate.get("idQADel")
);
const selectQAEdit = () => createSelector(
  selectQainfoDomain(),
  (substate) => substate.get("editQA")
);
const selectErrorEdit = () => createSelector(
  selectQainfoDomain(),
  (substate) => substate.getIn(['editQA','errorCode'])
);
export {
  selectQainfoDomain,
  selectListField,
  selectLoading,
  selectListQA,
  selectIdField,
  selectTotal,
  selectPage,
  selectError,
  selectQAAdd,
  selectIdFieldPage,
  selectQADetail,
  selectIdQADel,
  selectQAEdit,
  selectErrorEdit,
};
