import { createSelector } from 'reselect';

const selectCateAgriTechDomain = () => (state) => state.get('cateAgriTech');
const selectListCateAgriTech = () => createSelector(
  selectCateAgriTechDomain(),
  (substate) => substate.get('listCateAgriTech')
);
const selectNameCateAgriTechAdd = () => createSelector(
  selectCateAgriTechDomain(),
  (substate) => substate.get('nameCateAdd')
);
const selectIdDelCate = () => createSelector(
  selectCateAgriTechDomain(),
  (substate) => substate.get('idDelCate')
);
const selectLoading = () => createSelector(
  selectCateAgriTechDomain(),
  (substate) => substate.get('loading')
);
export {
  selectCateAgriTechDomain,
  selectListCateAgriTech,
  selectNameCateAgriTechAdd,
  selectIdDelCate,
  selectLoading,
};
