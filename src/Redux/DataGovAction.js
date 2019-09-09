export const ActionType = {
  FETCH_MOBILE_DATA_USAGE: 'FETCH_MOBILE_DATA_USAGE',
  MOBILE_DATA_USAGE_RECEIVED: 'MOBILE_DATA_USAGE_RECEIVED',
  MOBILE_DATA_USAGE_ERROR: 'MOBILE_DATA_USAGE_ERROR',
};

export const ActionCreator = {
  fetchMobileDataUsage: () => {
    return {
      type: ActionType.FETCH_MOBILE_DATA_USAGE,
    };
  },
};
