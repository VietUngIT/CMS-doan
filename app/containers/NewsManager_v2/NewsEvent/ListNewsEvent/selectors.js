import { createSelector } from 'reselect';

/**
 * Direct selector to the listNewsEvent state domain
 */
const selectListNewsEventDomain = () => (state) => state.get('listNewsEvent');

const selectListNewsEvent = () => createSelector(
  selectListNewsEventDomain(),
  (substate) => substate.get('listNews')
);
const selectidCateNewsEvent = () => createSelector(
  selectListNewsEventDomain(),
  (substate) => substate.get('idCate')
);
const selectPageNewsEvent = () => createSelector(
  selectListNewsEventDomain(),
  (substate) => substate.get('page')
);
const selectTotalItemNewsEvent = () => createSelector(
  selectListNewsEventDomain(),
  (substate) => substate.get('total')
);
const selectStateDelNewsEvent = () => createSelector(
  selectListNewsEventDomain(),
  (substate) => substate.get('delNewsSuccess')
);
const selectIdNewsEventDel = () => createSelector(
  selectListNewsEventDomain(),
  (substate) => substate.get('idNewsDel')
);
const selectNewsAdd = () => createSelector(
  selectListNewsEventDomain(),
  (substate) => substate.get("addNews")
);
const selectErrorCode = () => createSelector(
  selectListNewsEventDomain(),
  (substate) => substate.getIn(['addNews','errorCode'])
);
const selectListCateNewsEvent = () => createSelector(
  selectListNewsEventDomain(),
  (substate) => substate.get("listcatenews")
);
const selectLoading = () => createSelector(
  selectListNewsEventDomain(),
  (substate) => substate.get("loading")
);
const selectidNewsEventEdit = () => createSelector(
  selectListNewsEventDomain(),
  (substate) => substate.get("idNewsEdit")
);
const selectTags = () => createSelector(
  selectListNewsEventDomain(),
  (substate) => substate.get("tagsUpdate")
);
const selectImageUpdate = () => createSelector(
  selectListNewsEventDomain(),
  (substate) => substate.get("imageUpdate")
);
const selectNewsEventUpdate = () => createSelector(
  selectListNewsEventDomain(),
  (substate) => substate.get("editNews")
);
export {
  selectListNewsEventDomain,
  selectListNewsEvent,
  selectidCateNewsEvent,
  selectPageNewsEvent,
  selectTotalItemNewsEvent,
  selectStateDelNewsEvent,
  selectIdNewsEventDel,
  selectNewsAdd,
  selectErrorCode,
  selectListCateNewsEvent,
  selectLoading,
  selectidNewsEventEdit,
  selectTags,
  selectImageUpdate,
  selectNewsEventUpdate,
};
