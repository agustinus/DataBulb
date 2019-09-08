import React from 'react';
import MobileDataItemView from '../MobileDataItemView';

import renderer from 'react-test-renderer';

describe('MobileDataItemView', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(<MobileDataItemView year={'2020'} total={'9.1234567'} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders correctly if it's showing the icon", () => {
    const tree = renderer
      .create(
        <MobileDataItemView
          year={'2020'}
          total={'9.1234567'}
          showIcon={true}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
