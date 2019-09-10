import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import {MobileDataScreen} from '../MobileDataScreen';

configure({adapter: new Adapter()});

describe('MobileDataScreen', () => {
  let wrapper = null;
  let instance = null;

  beforeEach(() => {
    const props = {
      fetchMobileDataUsage: jest.fn(),
      data: [{year: '2000', total: '0.000123', decreasedQuarter: []}],
    };
    wrapper = shallow(<MobileDataScreen {...props} />);
    instance = wrapper.instance();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('StandardList').length).toBe(1);
  });

  it('should render item correctly', () => {
    const item = instance._renderItem({
      item: {year: '2000', total: '0.000123', decreasedQuarter: []},
    });
    expect(item).toMatchSnapshot();
  });

  it('should invoke _loadMore() if onEndReached triggered', () => {
    wrapper.setState({flatListReady: true, isCompleted: false});
    wrapper
      .find('StandardList')
      .props()
      .onEndReached();
    expect(instance.props.fetchMobileDataUsage).toHaveBeenCalledTimes(2);
  });

  it('should invoke _renderItem() if renderItem triggered', () => {
    const item = wrapper
      .find('StandardList')
      .props()
      .renderItem({
        item: {year: '2000', total: '0.000123', decreasedQuarter: []},
      });
    expect(item).toMatchSnapshot();
  });

  it('should set modalContent state with the item when onIconClicked is triggered', () => {
    const item = instance._renderItem({
      item: {year: '2000', total: '0.000123', decreasedQuarter: [1]},
    });
    const component = shallow(item);
    component
      .find('TouchableOpacity')
      .props()
      .onPress();
    expect(wrapper.state().modalContent).toEqual({
      year: '2000',
      total: '0.000123',
      decreasedQuarter: [1],
    });
  });

  it('should return modal content', () => {
    const content = instance._buildModalContent([1, 2, 3]);
    expect(content).toEqual('Q1 Q2 Q3');
  });

  it('should clear state when _onDismissModal is called', () => {
    const state = {decreasedQuarter: [1, 2]};
    wrapper.setState({modalContent: state});
    expect(wrapper.state().modalContent).toEqual(state);
    instance._onDismissModal();
    expect(wrapper.state().modalContent).toBeNull();
  });

  it('should show modal', () => {
    expect(wrapper.find('GeneralModal').length).toBe(0);
    wrapper.setState({modalContent: {decreasedQuarter: [1, 2]}});
    // console.log('TEST: ', comp.debug({verbose: true}));
    expect(wrapper.find('GeneralModal').length).toBe(1);
  });

  it('should invoke _onDismissModal when modal is dismissed', () => {
    expect(wrapper.find('GeneralModal').length).toBe(0);
    wrapper.setState({modalContent: {decreasedQuarter: [1, 2]}});
    wrapper
      .find('GeneralModal')
      .props()
      .onDismiss();
    expect(wrapper.state().modalContent).toBeNull();
  });

  it('should set state flatListReady only one when it is scrolled', () => {
    wrapper.setState({flatListReady: false});
    expect(wrapper.state().flatListReady).toEqual(false);
    instance._scrolled();
    expect(wrapper.state().flatListReady).toEqual(true);
    const result = instance._scrolled();
    expect(result).toBeNull();
    expect(wrapper.state().flatListReady).toEqual(true);
  });

  it('should call fetchMobileDataUsage (_loadMore) if flatlist is ready and still have next data', () => {
    wrapper.setState({flatListReady: false, isCompleted: false});
    expect(instance._loadMore()).toBeNull();
    expect(instance.props.fetchMobileDataUsage).toHaveBeenCalledTimes(1);

    wrapper.setState({flatListReady: false, isCompleted: true});
    expect(instance._loadMore()).toBeNull();
    expect(instance.props.fetchMobileDataUsage).toHaveBeenCalledTimes(1);

    wrapper.setState({flatListReady: true, isCompleted: false});
    expect(instance._loadMore()).not.toBeNull();
    expect(instance.props.fetchMobileDataUsage).toHaveBeenCalledTimes(2);

    wrapper.setState({flatListReady: true, isCompleted: true});
    expect(instance._loadMore()).not.toBeNull();
    expect(instance.props.fetchMobileDataUsage).toHaveBeenCalledTimes(3);
  });
});
