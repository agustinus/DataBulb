import Reducer from '../DataGovReducer';
import {ActionType} from '../DataGovAction';

describe('DataGovReducer', () => {
  const initState = {
    isFetching: null,
    error: null,
    data: null,
    offset: 0,
    nextOffset: 0,
    uncompletedYear: null,
    isCompleted: false,
  };

  const mobileDataUsageData = {
    annualRecords: [
      {
        year: '2019',
        total: '0.000001',
        decreasedQuarter: [1, 2],
        quarterly: [0.0000002, 0.0000001, 0.0000003, 0.0000004],
      },
    ],
    offset: 0,
    total: 6,
    uncompletedYear: [
      {
        year: '2020',
        total: '0.0000011',
        decreasedQuarter: [],
        quarterly: [0.0000005, 0.0000006],
      },
    ],
  };

  it('should return the initial state', () => {
    expect(Reducer(undefined, {})).toEqual(initState);
  });

  describe('DataGovReducer for ActionType.MOBILE_DATA_USAGE_RECEIVED', () => {
    it('should return data without the last uncompleted year if it still has next record(s) (next page)', () => {
      const action = {
        type: ActionType.MOBILE_DATA_USAGE_RECEIVED,
        data: {...mobileDataUsageData, total: 100},
      };

      expect(Reducer(initState, action)).toEqual({
        ...initState,
        isFetching: false,
        data: [
          {
            year: '2019',
            total: '0.000001',
            decreasedQuarter: [1, 2],
            quarterly: [0.0000002, 0.0000001, 0.0000003, 0.0000004],
          },
        ],
        offset: action.data.offset,
        nextOffset: initState.nextOffset + 45,
        uncompletedYear: [
          {
            year: '2020',
            total: '0.0000011',
            decreasedQuarter: [],
            quarterly: [0.0000005, 0.0000006],
          },
        ],
        isCompleted: false,
      });
    });

    it('should return data and append it with the last uncompleted year data if it is the last record (last page)', () => {
      const action = {
        type: ActionType.MOBILE_DATA_USAGE_RECEIVED,
        data: mobileDataUsageData,
      };

      expect(Reducer(initState, action)).toEqual({
        ...initState,
        isFetching: false,
        data: [
          {
            year: '2019',
            total: '0.000001',
            decreasedQuarter: [1, 2],
            quarterly: [0.0000002, 0.0000001, 0.0000003, 0.0000004],
          },
          {
            year: '2020',
            total: '0.0000011',
            decreasedQuarter: [],
            quarterly: [0.0000005, 0.0000006],
          },
        ],
        offset: action.data.offset,
        nextOffset: initState.nextOffset + 45,
        uncompletedYear: [
          {
            year: '2020',
            total: '0.0000011',
            decreasedQuarter: [],
            quarterly: [0.0000005, 0.0000006],
          },
        ],
        isCompleted: true,
      });
    });

    it('should add new data to the state instead of storing only the last records', () => {
      const action = {
        type: ActionType.MOBILE_DATA_USAGE_RECEIVED,
        data: mobileDataUsageData,
      };

      const state = {
        ...initState,
        data: [
          {
            year: '2018',
            total: '0.000001',
            decreasedQuarter: [],
            quarterly: [0.0000002, 0.0000002, 0.0000003, 0.0000003],
          },
        ],
      };

      expect(Reducer(state, action)).toEqual({
        ...state,
        isFetching: false,
        data: [
          {
            year: '2018',
            total: '0.000001',
            decreasedQuarter: [],
            quarterly: [0.0000002, 0.0000002, 0.0000003, 0.0000003],
          },
          {
            year: '2019',
            total: '0.000001',
            decreasedQuarter: [1, 2],
            quarterly: [0.0000002, 0.0000001, 0.0000003, 0.0000004],
          },
          {
            year: '2020',
            total: '0.0000011',
            decreasedQuarter: [],
            quarterly: [0.0000005, 0.0000006],
          },
        ],
        offset: action.data.offset,
        nextOffset: initState.nextOffset + 45,
        uncompletedYear: [
          {
            year: '2020',
            total: '0.0000011',
            decreasedQuarter: [],
            quarterly: [0.0000005, 0.0000006],
          },
        ],
        isCompleted: true,
      });
    });
  });

  it('should push the error to the store when MOBILE_DATA_USAGE_ERROR action is dispatched', () => {
    const action = {
      type: ActionType.MOBILE_DATA_USAGE_ERROR,
      error: {status: 500},
    };

    const state = {
      ...initState,
      data: [
        {
          year: '2018',
          total: '0.000001',
          decreasedQuarter: [],
          quarterly: [0.0000002, 0.0000002, 0.0000003, 0.0000003],
        },
      ],
    };

    expect(Reducer(state, action)).toEqual({
      ...state,
      isFetching: false,
      data: [
        {
          year: '2018',
          total: '0.000001',
          decreasedQuarter: [],
          quarterly: [0.0000002, 0.0000002, 0.0000003, 0.0000003],
        },
      ],
      error: {status: 500},
    });
  });

  it('should reset to initial state when REFRESH_MOBILE_DATA_USAGE action is dispatched', () => {
    const action = {
      type: ActionType.REFRESH_MOBILE_DATA_USAGE,
    };

    const state = {
      ...initState,
      data: [
        {
          year: '2018',
          total: '0.000001',
          decreasedQuarter: [],
          quarterly: [0.0000002, 0.0000002, 0.0000003, 0.0000003],
        },
      ],
    };

    expect(Reducer(state, action)).toEqual({
      ...initState,
    });
  });
});
