import React from 'react';
import GeneralModal from '../GeneralModal';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import ReactTestRenderer from 'react-test-renderer';

configure({adapter: new Adapter()});

describe('GeneralModal', () => {
  let wrapper = null;

  beforeAll(() => {
    const props = {isVisible: false};
    wrapper = shallow(<GeneralModal {...props} />);
  });

  it('renders correctly', () => {
    expect(
      ReactTestRenderer.create(<GeneralModal />).toJSON(),
    ).toMatchSnapshot();
  });

  it('should invoke _setModalVisible() when onPress', () => {
    wrapper
      .find('TouchableOpacity')
      .props()
      .onPress(true);
    expect(wrapper.state().modalVisible).toEqual(true);
  });
});
