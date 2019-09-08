import React from 'react';
import GeneralModal from '../GeneralModal';

import ReactTestRenderer from 'react-test-renderer';

describe('GeneralModal', () => {
  let wrapper = null;

  beforeAll(() => {
    wrapper = ReactTestRenderer.create(<GeneralModal />);
  });

  test('renders correctly', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
