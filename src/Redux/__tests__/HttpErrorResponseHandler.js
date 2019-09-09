import HttpErrorResponseHandler from '../HttpErrorResponseHandler';

describe('HttpErrorResponseHandler', () => {
  test('given error status 400 will return null', () => {
    let result = HttpErrorResponseHandler({
      getState: jest.fn().mockReturnValue('store mocked'),
    })(jest.fn())({error: {status: 400}});
    expect(result).toBe(null);
  });

  test('given error status 401 will return null', () => {
    let result = HttpErrorResponseHandler({
      getState: jest.fn().mockReturnValue('store mocked'),
    })(jest.fn())({error: {status: 401}});
    expect(result).toBe(null);
  });

  test('given error status 500 will return null', () => {
    let result = HttpErrorResponseHandler({
      getState: jest.fn().mockReturnValue('store mocked'),
    })(jest.fn())({error: {status: 500}});
    expect(result).toBe(null);
  });

  test('given error status 200 will return null', () => {
    let result = HttpErrorResponseHandler({
      getState: jest.fn().mockReturnValue('store mocked'),
    })(jest.fn())({error: {status: 200}});
    expect(result).toBe(null);
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
