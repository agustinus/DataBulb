import React from 'react';
import VerticalTitle from '../VerticalTitle';

import renderer from 'react-test-renderer';

describe('VerticalTitle', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<VerticalTitle />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
