import { createSelector } from 'reselect';

/**
 * Direct selector to the expertDetail state domain
 */
const selectExpertDetailDomain = () => (state) => state.get('expertDetail');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ExpertDetail
 */

const makeSelectExpertDetail = () => createSelector(
  selectExpertDetailDomain(),
  (substate) => substate.toJS()
);

export default makeSelectExpertDetail;
export {
  selectExpertDetailDomain,
};
