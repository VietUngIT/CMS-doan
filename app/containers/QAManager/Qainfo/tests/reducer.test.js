
import { fromJS } from 'immutable';
import qainfoReducer from '../reducer';

describe('qainfoReducer', () => {
  it('returns the initial state', () => {
    expect(qainfoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
