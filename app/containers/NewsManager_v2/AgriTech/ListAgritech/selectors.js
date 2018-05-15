import { createSelector } from 'reselect';

const selectListAgritechDomain = () => (state) => state.get('listAgritech');

const selectListNewsAgriTech = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('listNewsAgriTech')
);
const selectidSubCateNewsAgriTech = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('idSubCate')
);
const selectPageNewsAgriTech = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('page')
);
const selectTotalItemNewsAgritech = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('total')
);
const selectgetListSubCateNewsAgriTech = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('listSubCate')
);
const selectIdCateGetSubCate = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('idCate')
);
const selectListCateAgriTech = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('listCateAgriTech')
);
const selectIdNewsATDel = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('idDelNews')
);
const selectStateDelAT = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('delNewsSuccess')
);
const selectNewsAddAgriTech = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get("addNews")
);
const selectErrorCodeAdAgriTech = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.getIn(['addNews','errorCode'])
);
const selectLoading = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get("loading")
);
const selectidNewsAGEdit = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get("idNewsAGEdit")
);
const selectTags = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get("tagsUpdate")
);
const selectImageAGUpdate = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get("imageUpdateAG")
);
const selectNewsAGUpdate = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get("editNews")
);
export {
  selectListAgritechDomain,
  selectListNewsAgriTech,
  selectidSubCateNewsAgriTech,
  selectPageNewsAgriTech,
  selectTotalItemNewsAgritech,
  selectgetListSubCateNewsAgriTech,
  selectIdCateGetSubCate,
  selectListCateAgriTech,
  selectNewsAddAgriTech,
  selectStateDelAT,
  selectErrorCodeAdAgriTech,
  selectIdNewsATDel,
  selectLoading,
  selectidNewsAGEdit,
  selectTags,
  selectImageAGUpdate,
  selectNewsAGUpdate,
};
