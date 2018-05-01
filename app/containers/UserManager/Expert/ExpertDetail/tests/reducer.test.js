
import { fromJS } from 'immutable';
import expertDetailReducer from '../reducer';

describe('expertDetailReducer', () => {
  it('returns the initial state', () => {
    expect(expertDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
