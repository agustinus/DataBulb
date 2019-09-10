import React from 'react';
import GeneralModal from '../GeneralModal';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import ReactTestRenderer from 'react-test-renderer';

configure({adapter: new Adapter()});

describe('GeneralModal', () => {
  let wrapper = null;
  let instance = null;

  beforeAll(() => {
    const props = {isVisible: false, onDismiss: jest.fn()};
    wrapper = shallow(<GeneralModal {...props} />);
    instance = wrapper.instance();
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
    wrapper
      .find('TouchableOpacity')
      .props()
      .onPress(true);
    expect(instance.props.onDismiss).toHaveBeenCalledTimes(1);
  });

  it('should show button text OK if no buttonText props set', () => {
    const buttonText = wrapper.findWhere(
      node => node.prop('testID') === 'testIDButtonText',
    );
    expect(buttonText.exists()).toBe(true);
    expect(toJson(buttonText)).toMatchSnapshot();
  });

  it('should show button text from set props', () => {
    wrapper.setProps({buttonText: 'This new button text'});
    const buttonText = wrapper.findWhere(
      node => node.prop('testID') === 'testIDButtonText',
    );
    expect(buttonText.exists()).toBe(true);
    expect(toJson(buttonText)).toMatchSnapshot();
  });
});
