import {ActionType} from './DataGovAction';

const RECORDS_LIMIT = 45;

const initState = {
  isFetching: null,
  error: null,
  data: null,
  offset: 0,
  nextOffset: 0,
  uncompletedYear: null,
  isCompleted: false,
};

function Reducer(state = initState, action) {
  switch (action.type) {
    case ActionType.FETCH_MOBILE_DATA_USAGE:
      return {
        ...state,
        isFetching: true,
      };
    case ActionType.MOBILE_DATA_USAGE_RECEIVED:
      let endOfPage = action.data.offset + RECORDS_LIMIT >= action.data.total;
      let data = action.data.annualRecords;
      if (endOfPage) {
        data = data.concat(...action.data.uncompletedYear);
      }
      return {
        ...state,
        isFetching: false,
        data: state.data == null ? data : state.data.concat(data),
        offset: action.data.offset,
        nextOffset: state.nextOffset + RECORDS_LIMIT,
        uncompletedYear: action.data.uncompletedYear,
        isCompleted: endOfPage,
      };
    default:
      return state;
  }
}

export default Reducer;
