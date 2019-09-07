import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default class VerticalTitle extends React.Component {
  render() {
    return <Text style={styles.title}>MOBILE DATA USAGE</Text>;
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'right',
    transform: [{rotate: '-90deg'}],
    color: '#373737',
    width: 250,
    marginTop: 116,
    letterSpacing: 1.67,
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowColor: '#0000006A',
    textShadowRadius: 2,
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
