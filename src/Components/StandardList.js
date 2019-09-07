import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class StandardList extends React.PureComponent {
  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    onRefresh: PropTypes.func,
    isRefreshing: PropTypes.bool,
    style: PropTypes.object,
    onEndReached: PropTypes.func,
    onScroll: PropTypes.func,
  };

  static defaultProps = {
    isRefreshing: false,
  };

  _keyExtractor = (item, index) => index.toString();

  constructor(props) {
    super(props);
  }

  _itemSeparator = () => {
    return (
      //Item Separator
      <View style={styles.listSeparator} />
    );
  };

  render() {
    return (
      <FlatList
        style={this.props.style}
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={({item}) => this.props.renderItem({item})}
        ItemSeparatorComponent={this._itemSeparator}
        onRefresh={this.props.onRefresh}
        refreshing={this.props.isRefreshing}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={0.3}
        onScroll={this.props.onScroll}
      />
    );
  }
}

const styles = StyleSheet.create({
  listSeparator: {
    height: 10,
    width: '100%',
  },
  textBox: {
    backgroundColor: 'black',
    color: 'white',
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
