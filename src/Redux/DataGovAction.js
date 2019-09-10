export const ActionType = {
  FETCH_MOBILE_DATA_USAGE: 'FETCH_MOBILE_DATA_USAGE',
  MOBILE_DATA_USAGE_RECEIVED: 'MOBILE_DATA_USAGE_RECEIVED',
  MOBILE_DATA_USAGE_ERROR: 'MOBILE_DATA_USAGE_ERROR',
  REFRESH_MOBILE_DATA_USAGE: 'REFRESH_MOBILE_DATA_USAGE',
};

export const ActionCreator = {
  fetchMobileDataUsage: () => {
    return {
      type: ActionType.FETCH_MOBILE_DATA_USAGE,
    };
  },
  refreshMobileDataUsage: () => {
    return {
      type: ActionType.REFRESH_MOBILE_DATA_USAGE,
    };
  },
};
