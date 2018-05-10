import { createSelector } from 'reselect';

const selectExpertDetailDomain = () => (state) => state.get('expertDetail');

const selectIdExpert = () => createSelector(
  selectExpertDetailDomain(),
  (substate) => substate.get('idExpert')
);
const selectExpertDetail = () => createSelector(
  selectExpertDetailDomain(),
  (substate) => substate.get('expertDetail')
);
const selectLoading = () => createSelector(
  selectExpertDetailDomain(),
  (substate) => substate.get('isLoading')
);
const selectListField = () => createSelector(
  selectExpertDetailDomain(),
  (substate) => substate.get('listField')
);
const selectDegree = () => createSelector(
  selectExpertDetailDomain(),
  (substate) => substate.get('degree')
);
const selectPhone = () => createSelector(
  selectExpertDetailDomain(),
  (substate) => substate.get('phone')
);
const selectSubField = () => createSelector(
  selectExpertDetailDomain(),
  (substate) => substate.get('listSubField')
);
const selectIdSubField = () => createSelector(
  selectExpertDetailDomain(),
  (substate) => substate.get('idSubField')
);
const selectTags = () => createSelector(
  selectExpertDetailDomain(),
  (substate) => substate.get('tags')
);
const selectidExpertStatitic = () => createSelector(
  selectExpertDetailDomain(),
  (substate) => substate.get('idExpertStatitic')
);
const selectstatiticComment = () => createSelector(
  selectExpertDetailDomain(),
  (substate) => substate.get('statiticComment')
);
const selecttotalActice = () => createSelector(
  selectExpertDetailDomain(),
  (substate) => substate.get('selecttotalActice')
);
export {
  selectExpertDetailDomain,
  selectIdExpert,
  selectExpertDetail,
  selectLoading,
  selectListField,
  selectDegree,
  selectPhone,
  selectSubField,
  selectIdSubField,
  selectTags,
  selectidExpertStatitic,
  selectstatiticComment,
  selecttotalActice,
};
