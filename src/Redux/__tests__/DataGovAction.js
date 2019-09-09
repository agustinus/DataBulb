import {ActionCreator, ActionType} from '../DataGovAction';

describe('ActionCreator', () => {
  it('fetchMobileDataUsage will return the correct action type', () => {
    expect(ActionCreator.fetchMobileDataUsage()).toMatchObject({
      type: ActionType.FETCH_MOBILE_DATA_USAGE,
    });
  });
});
