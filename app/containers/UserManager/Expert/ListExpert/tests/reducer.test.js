
import { fromJS } from 'immutable';
import listExpertReducer from '../reducer';

describe('listExpertReducer', () => {
  it('returns the initial state', () => {
    expect(listExpertReducer(undefined, {})).toEqual(fromJS({}));
  });
});
