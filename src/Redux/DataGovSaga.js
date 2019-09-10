import {call, put, takeEvery} from 'redux-saga/effects';
import DataGovService from '../Domain/DataGovService';
import Store from './Store';
import {ActionType} from './DataGovAction';

function* fetchMobileDataUsage() {
  let state = Store.getState();
  try {
    const data = yield call(
      DataGovService.fetchMobileDataUsage,
      state.dataGov.nextOffset,
    );
    const result = yield call(
      getAnnualData,
      data.result.records,
      state.dataGov.uncompletedYear && state.dataGov.uncompletedYear[0],
    );
    yield put({
      type: ActionType.MOBILE_DATA_USAGE_RECEIVED,
      data: {
        annualRecords: result.data,
        offset: data.result.offset,
        total: data.result.total,
        uncompletedYear: result.uncompletedYear,
      },
    });
  } catch (error) {
    yield put({type: ActionType.MOBILE_DATA_USAGE_ERROR, error});
  }
}

export function* watchFetchMobileDataUsage() {
  yield takeEvery(ActionType.FETCH_MOBILE_DATA_USAGE, fetchMobileDataUsage);
}

// Will be assumed the year will 4 digits at max
// We're going to get the year from the quarter field by substring instead of split function for efficiency
// Return: {data: [{year: <year>, total: <total>, decreasedQuarter: [<quarter>, ...], quarterly:[<vol>, <vol>, <vol>, <vol>]}, ...],
// uncompletedYear: [{year: <year>, total: <total>, decreasedQuarter: [<quarter>, ...], quarterly:[<vol>, <vol>, <vol>, <vol>]}, ...]}
function getAnnualData(records, lastUncompletedYear) {
  let data = [];
  let uncompletedYear = [];
  if (records && records.length > 0) {
    let year = lastUncompletedYear ? lastUncompletedYear.year : '';
    let total = lastUncompletedYear
      ? parseFloat(lastUncompletedYear.total)
      : 0.0;
    let lastQuarterVol =
      lastUncompletedYear && lastUncompletedYear.quarterly
        ? lastUncompletedYear.quarterly[
            lastUncompletedYear.quarterly.length - 1
          ]
        : 0;
    let decreasedQuarter = lastUncompletedYear
      ? lastUncompletedYear.decreasedQuarter
      : [];
    let quarterlyVol = lastUncompletedYear ? lastUncompletedYear.quarterly : [];
    for (let i = 0; i < records.length; i++) {
      year = records[i].quarter.substring(0, 4);
      let quarter = parseInt(records[i].quarter.substring(6), 10);
      let quarterVol = parseFloat(records[i].volume_of_mobile_data);

      total += quarterVol;
      if (lastQuarterVol > quarterVol) {
        decreasedQuarter.push(quarter);
      }
      lastQuarterVol = quarterVol;
      quarterlyVol[quarter - 1] = quarterVol;

      if (quarter === 4) {
        data.push({
          year: year,
          total: total.toFixed(6),
          decreasedQuarter: decreasedQuarter,
          quarterly: quarterlyVol,
        });

        total = 0;
        decreasedQuarter = [];
        // lastQuarterVol = 0;
        quarterlyVol = [];
      }
    }

    if (quarterlyVol.length > 0) {
      uncompletedYear.push({
        year: year,
        total: total.toFixed(6),
        decreasedQuarter: decreasedQuarter,
        quarterly: quarterlyVol,
      });
    }
  }

  return {data, uncompletedYear};
}

export default {
  watchFetchMobileDataUsage,
  __private__: {getAnnualData, fetchMobileDataUsage},
};
