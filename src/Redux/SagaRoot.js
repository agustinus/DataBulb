import {all} from 'redux-saga/effects';
import {watchFetchMobileDataUsage} from './DataGovSaga';

export default function* sagaRoot() {
  yield all([watchFetchMobileDataUsage()]);
}
