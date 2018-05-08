import { createSelector } from 'reselect';

const selectCateMarketPriceDomain = () => (state) => state.get('cateMarketPrice');
const selectListCateMP = () => createSelector(
  selectCateMarketPriceDomain(),
  (substate) => substate.get('listCateMP')
);
const selectNameCateAdd = () => createSelector(
  selectCateMarketPriceDomain(),
  (substate) => substate.get('nameCateAdd')
);
const selectImageCateAdd = () => createSelector(
  selectCateMarketPriceDomain(),
  (substate) => substate.get('image')
);
const selectIdDelCate = () => createSelector(
  selectCateMarketPriceDomain(),
  (substate) => substate.get('idDelCate')
);
const selectErrorCodeCate = () => createSelector(
  selectCateMarketPriceDomain(),
  (substate) => substate.get('errorCode')
);
const selectLoading = () => createSelector(
  selectCateMarketPriceDomain(),
  (substate) => substate.get('loading')
);
export {
  selectCateMarketPriceDomain,
  selectListCateMP,
  selectNameCateAdd,
  selectImageCateAdd,
  selectIdDelCate,
  selectErrorCodeCate,
  selectLoading,
};
