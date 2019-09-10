import HttpErrorResponseHandler from '../HttpErrorResponseHandler';

describe('HttpErrorResponseHandler', () => {
  test('given error status 400 will return null', () => {
    let result = HttpErrorResponseHandler({
      getState: jest.fn().mockReturnValue('store mocked'),
    })(jest.fn().mockReturnValue({error: {status: 400}}))({
      error: {status: 400},
    });
    expect(result).toMatchObject(Promise.reject({status: 400}));
  });

  test('given error status 401 will return null', () => {
    let result = HttpErrorResponseHandler({
      getState: jest.fn().mockReturnValue('store mocked'),
    })(jest.fn().mockReturnValue({error: {status: 401}}))({
      error: {status: 401},
    });
    expect(result).toMatchObject(Promise.reject({status: 401}));
  });

  test('given error status 500 will return null', () => {
    let result = HttpErrorResponseHandler({
      getState: jest.fn().mockReturnValue('store mocked'),
    })(jest.fn().mockReturnValue({error: {status: 500}}))({
      error: {status: 500},
    });
    expect(result).toMatchObject(Promise.reject({status: 500}));
  });

  test('given error status 200 will return null', () => {
    let result = HttpErrorResponseHandler({
      getState: jest.fn().mockReturnValue('store mocked'),
    })(jest.fn().mockReturnValue({error: {status: 200}}))({
      error: {status: 200},
    });
    expect(result).toMatchObject(Promise.reject({status: 200}));
  });

  test('given error message will return null', () => {
    let result = HttpErrorResponseHandler({
      getState: jest.fn().mockReturnValue('store mocked'),
    })(jest.fn().mockReturnValue({error: 'oops'}))({
      error: {message: 'Network request failed'},
    });
    expect(result).rejects.toBe('oops');
  });

  test('given no error status & message will return null', () => {
    let result = HttpErrorResponseHandler({
      getState: jest.fn().mockReturnValue('store mocked'),
    })(jest.fn().mockReturnValue({error: 'oops'}))({
      error: {},
    });
    expect(result).toBe(null);
  });
});
