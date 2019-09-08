import DomainCommon from '../Common';
import fetchMock from 'fetch-mock';

describe('DomainCommon', () => {
  const headers = {
    Accept: 'application/json',
  };

  const body = {
    result: 'This is the response',
  };

  afterEach(() => {
    fetchMock.restore();
  });

  test('fetch (GET) with return status 2xx but not 204 will return data', () => {
    fetchMock.getOnce('http://databulb.test', {
      body: body,
      headers: headers,
    });

    return new Promise((resolve, reject) => {
      let endpoint = 'http://databulb.test';
      return DomainCommon.fetch(endpoint, resolve, reject);
    }).then(response => {
      expect(response).toHaveProperty('result');
      expect(response.result).toMatch('This is the response');
    });
  });

  test('fetch (GET) with return status 204 will return nothing', () => {
    fetchMock.getOnce('http://databulb.test', {
      body: body,
      headers: headers,
      status: 204,
    });

    return new Promise((resolve, reject) => {
      let endpoint = 'http://databulb.test';
      return DomainCommon.fetch(endpoint, resolve, reject);
    }).then(response => {
      expect(response).toStrictEqual({});
    });
  });

  test('fetch (GET) with return status 500 + json response data  will return error status and the response data', () => {
    fetchMock.getOnce('http://databulb.test', {
      body: body,
      headers: headers,
      status: 500,
    });

    return new Promise((resolve, reject) => {
      let endpoint = 'http://databulb.test';
      return DomainCommon.fetch(endpoint, resolve, reject);
    }).catch(error => {
      expect(error).toHaveProperty('result');
      expect(error.result).toMatch('This is the response');
      expect(error).toHaveProperty('status');
      expect(error.status).toBe(500);
    });
  });

  test('fetch (GET) with return status 500 and non json response data will return error status 500', () => {
    fetchMock.getOnce('http://databulb.test', {
      body: 'no json',
      status: 500,
    });

    return new Promise((resolve, reject) => {
      let endpoint = 'http://databulb.test';
      return DomainCommon.fetch(endpoint, resolve, reject);
    }).catch(error => {
      expect(error).toHaveProperty('status');
      expect(error.status).toBe(500);
    });
  });

  test('fetch (GET) got failed', () => {
    fetchMock.getOnce('http://databulb.test', {
      throws: new TypeError('Failed to fetch'),
    });

    return new Promise((resolve, reject) => {
      let endpoint = 'http://databulb.test';
      return DomainCommon.fetch(endpoint, resolve, reject);
    }).catch(error => {
      // console.log('TEST ERROR: ', error);
      // expect(error).toThrow();
    });
  });

  test('fetchPost with return status 2xx but not 204 will return data', () => {
    fetchMock.postOnce('http://databulb.test', {
      body: body,
      headers: headers,
    });

    return new Promise((resolve, reject) => {
      let endpoint = 'http://databulb.test';
      return DomainCommon.fetchPost(endpoint, {param: 'test'}, resolve, reject);
    }).then(response => {
      expect(response).toHaveProperty('result');
      expect(response.result).toMatch('This is the response');
    });
  });

  test('fetchPut with return status 2xx but not 204 will return data', () => {
    fetchMock.putOnce('http://databulb.test', {
      body: body,
      headers: headers,
    });

    return new Promise((resolve, reject) => {
      let endpoint = 'http://databulb.test';
      return DomainCommon.fetchPut(endpoint, {param: 'test'}, resolve, reject);
    }).then(response => {
      expect(response).toHaveProperty('result');
      expect(response.result).toMatch('This is the response');
    });
  });

  test('fetchDelete with return status 2xx but not 204 will return data', () => {
    fetchMock.deleteOnce('http://databulb.test', {
      body: body,
      headers: headers,
    });

    return new Promise((resolve, reject) => {
      let endpoint = 'http://databulb.test';
      return DomainCommon.fetchDelete(endpoint, resolve, reject, {
        param: 'test',
      });
    }).then(response => {
      expect(response).toHaveProperty('result');
      expect(response.result).toMatch('This is the response');
    });
  });
});
