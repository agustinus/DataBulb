import {ActionCreator, ActionType} from '../DataGovAction';

describe('ActionCreator', () => {
  it('fetchMobileDataUsage will return the correct action type', () => {
    expect(ActionCreator.fetchMobileDataUsage()).toMatchObject({
      type: ActionType.FETCH_MOBILE_DATA_USAGE,
    });
  });

  it('refreshMobileDataUsage will return the correct action type', () => {
    expect(ActionCreator.refreshMobileDataUsage()).toMatchObject({
      type: ActionType.REFRESH_MOBILE_DATA_USAGE,
    });
  });
});
