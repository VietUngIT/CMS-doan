
import { fromJS } from 'immutable';
import inFoListExpertReducer from '../reducer';

describe('inFoListExpertReducer', () => {
  it('returns the initial state', () => {
    expect(inFoListExpertReducer(undefined, {})).toEqual(fromJS({}));
  });
});
