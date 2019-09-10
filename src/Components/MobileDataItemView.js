import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

export default class MobileDataItemView extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    year: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired,
    showIcon: PropTypes.bool,
    onIconClicked: PropTypes.func,
    style: PropTypes.object,
  };

  render() {
    return (
      <View style={{...styles.box, ...this.props.style}}>
        <View style={styles.contentWrapper}>
          <View style={styles.yearWrapper}>
            <Text style={styles.year}>{this.props.year}</Text>
          </View>
          <View style={styles.totalWrapper}>
            <Text style={styles.text}>{'Total Volume of\nMobile Data'}</Text>
            <Text style={styles.total}>{this.props.total}</Text>
          </View>
          {this.props.showIcon ? (
            <TouchableOpacity
              style={styles.icon}
              onPress={this.props.onIconClicked}>
              <Image
                style={styles.image}
                source={require('../res/images/icon-decreased.png')}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.icon} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    marginHorizontal: 5,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    height: 90,
    paddingLeft: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearWrapper: {
    flex: 1.5,
    justifyContent: 'center',
  },
  year: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalWrapper: {
    flex: 3.5,
    justifyContent: 'flex-end',
  },
  total: {
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'right',
  },
  text: {
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'italic',
    textAlign: 'right',
    paddingBottom: 8,
    color: '#606060',
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    height: 25,
    width: 25,
  },
  image: {
    height: 25,
    width: 25,
  },
  loadingContainer: {
    marginTop: 80,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
  },
});
