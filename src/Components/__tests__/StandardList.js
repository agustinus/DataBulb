import React from 'react';
import StandardList from '../StandardLIst';

import renderer from 'react-test-renderer';

describe('StandardList', () => {
  let tree = null;
  let instance = null;

  beforeAll(() => {
    tree = renderer.create(
      <StandardList
        renderItem={item => {
          return 'test item';
        }}
        data={[{title: 'test title'}]}
      />,
    );
    instance = tree.getInstance();
  });

  test('renders correctly', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('function: keyExtractor converts index to string', () => {
    expect(instance._keyExtractor(null, 1)).toMatch('1');
  });

  test('function: itemSeparator renders the correct style', () => {
    expect(instance._itemSeparator()).toMatchSnapshot();
  });

  test('renders items correctly', () => {
    expect(instance.props.renderItem()).toMatchSnapshot();
  });
});
