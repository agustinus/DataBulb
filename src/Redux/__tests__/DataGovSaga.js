import DataGovSaga from '../DataGovSaga';
import DataGovService from '../../Domain/DataGovService';
import {call, put} from 'redux-saga/effects';
import {ActionType} from '../DataGovAction';

describe('DataGovSaga', () => {
  describe('getAnnualData() function', () => {
    it('should return reconstructed empty data if no parameter', () => {
      expect(DataGovSaga.__private__.getAnnualData()).toEqual({
        data: [],
        uncompletedYear: [],
      });
    });

    it('should recontruct data from API', () => {
      let data = [
        buildTestData.mobileDataUsage(2000, 1, 0, 6, 8),
        buildTestData.mobileDataUsage(2001, 3, 6, 6, 8),
      ];

      let result = DataGovSaga.__private__.getAnnualData(data[0].records);

      expect(result).toEqual({
        data: [
          {
            year: '2000',
            total: '0.000010',
            decreasedQuarter: [],
            quarterly: [0.000001, 0.000002, 0.000003, 0.000004],
          },
        ],
        uncompletedYear: [
          {
            year: '2001',
            total: '0.000011',
            decreasedQuarter: [],
            quarterly: [0.000005, 0.000006],
          },
        ],
      });

      expect(
        DataGovSaga.__private__.getAnnualData(
          data[1].records,
          result.uncompletedYear[0],
        ),
      ).toEqual({
        data: [
          {
            year: '2001',
            total: '0.000026',
            decreasedQuarter: [],
            quarterly: [0.000005, 0.000006, 0.000007, 0.000008],
          },
        ],
        uncompletedYear: [],
      });
    });

    it('should indicate there is/are decreament on mobile data usage in every quarter', () => {
      let data = buildTestData.mobileDataUsage(2000, 1, 0, 6, 8);
      data.records[0].volume_of_mobile_data = 0.000007;
      data.records[3].volume_of_mobile_data = 0.000006;

      let result = DataGovSaga.__private__.getAnnualData(data.records);

      expect(result).toEqual({
        data: [
          {
            year: '2000',
            total: '0.000018',
            decreasedQuarter: [2],
            quarterly: [0.000007, 0.000002, 0.000003, 0.000006],
          },
        ],
        uncompletedYear: [
          {
            year: '2001',
            total: '0.000011',
            decreasedQuarter: [1],
            quarterly: [0.000005, 0.000006],
          },
        ],
      });
    });
  });

  describe('fetchMobileDataUsage() function', () => {
    it('should yield all the Effects)', () => {
      const iterator = DataGovSaga.__private__.fetchMobileDataUsage();
      // console.log('TEST: ', iterator.next().value);
      // console.log('TEST: ', iterator.next({result: {records: []}}).value);
      // console.log('TEST: ', iterator.next({data: []}).value);
      expect(iterator.next().value).toEqual(
        call(DataGovService.fetchMobileDataUsage, 0),
      );
      expect(iterator.next({result: {records: []}}).value).toEqual(
        call(DataGovSaga.__private__.getAnnualData, [], null),
      );
      expect(iterator.next({data: []}).value).toEqual(
        put({
          type: ActionType.MOBILE_DATA_USAGE_RECEIVED,
          data: {
            annualRecords: [],
            offset: undefined,
            total: undefined,
            uncompletedYear: undefined,
          },
        }),
      );
    });

    it('should catch the error)', () => {
      const iterator = DataGovSaga.__private__.fetchMobileDataUsage();

      expect(iterator.next().value).toEqual(
        call(DataGovService.fetchMobileDataUsage, 0),
      );

      const error = {};
      expect(iterator.throw(error).value).toEqual(
        put({type: ActionType.MOBILE_DATA_USAGE_ERROR, error}),
      );
    });
  });
});

const buildTestData = {
  mobileDataUsage: (
    startYear = 2000,
    startQuarter = 1,
    offset = 0,
    limit = 45,
    total = 59,
  ) => {
    let records = [];
    let counter = startQuarter;
    let year = counter === 1 ? startYear - 1 : startYear;
    let maxIteration = offset + limit < total ? limit : total - offset;
    for (let i = 0; i < maxIteration; i++) {
      if (counter === 1) {
        year++;
      }
      records.push({
        volume_of_mobile_data: ((i + 1 + offset) / 1000000).toFixed(6),
        quarter: year.toString() + '-Q' + (counter++).toString(),
      });

      if (counter === 5) {
        counter = 1;
      }
    }

    return {
      records: records,
      offset: offset,
      limit: limit,
      total: total,
    };
  },
};
