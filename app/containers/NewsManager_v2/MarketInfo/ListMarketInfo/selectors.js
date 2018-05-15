import { createSelector } from 'reselect';

/**
 * Direct selector to the listMarketInfo state domain
 */
const selectListMarketInfoDomain = () => (state) => state.get('listMarketInfo');
const selectListNewsMK = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.get('listNewsMK')
);
const selectidCateNewsMK = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.get('idCate')
);
const selectPageNews = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.get('page')
);
const selectTotalItemNews = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.get('total')
);
const selectgetListCateNewsMK = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.get('listcatenewsMK')
);
const selectIdNewsMKDel = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.get('idDelMK')
);
const selectStateDelMK = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.get('delNewsSuccess')
);
const selectNewsAddMK = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.get("addNews")
);
const selectErrorCodeMK = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.getIn(['addNews','errorCode'])
);
const selectLoading = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.get("loading")
);
const selectidNewsMKEdit = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.get("idNewsMKEdit")
);
const selectTags = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.get("tagsUpdate")
);
const selectImageMKUpdate = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.get("imageUpdateMK")
);
const selectNewsMKUpdate = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.get("editNews")
);
export {
  selectListMarketInfoDomain,
  selectListNewsMK,
  selectidCateNewsMK,
  selectPageNews,
  selectTotalItemNews,
  selectgetListCateNewsMK,
  selectIdNewsMKDel,
  selectStateDelMK,
  selectNewsAddMK,
  selectErrorCodeMK,
  selectLoading,
  selectidNewsMKEdit,
  selectTags,
  selectImageMKUpdate,
  selectNewsMKUpdate,
};
