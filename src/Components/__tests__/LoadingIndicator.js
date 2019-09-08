import React from 'react';
import LoadingIndicator from '../LoadingIndicator';

import ReactTestRenderer from 'react-test-renderer';

describe('LoadingIndicator', () => {
  test('renders correctly', () => {
    const tree = ReactTestRenderer.create(<LoadingIndicator />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders correctly if it's loading", () => {
    const tree = ReactTestRenderer.create(
      <LoadingIndicator isLoading={true} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
