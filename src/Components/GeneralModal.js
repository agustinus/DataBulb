import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class GeneralModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.isVisible,
    };
  }

  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    onDismiss: PropTypes.func,
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        presentationStyle="overFullScreen"
        onDismiss={this.props.onDismiss}>
        <View style={styles.background}>
          <View style={styles.alertDialog}>
            <View style={styles.contentWrapper}>
              <Text style={styles.title}>{this.props.title}</Text>
              <Text style={styles.content}>{this.props.content}</Text>
            </View>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => this._setModalVisible(!this.state.modalVisible)}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
}

const styles = StyleSheet.create({
  title: {fontSize: 14, color: '#444444', textAlign: 'center'},
  content: {
    fontSize: 36,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 20,
    color: '#868686',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonWrapper: {flex: 1, justifyContent: 'center'},
  contentWrapper: {
    flex: 2,
    justifyContent: 'space-around',
    paddingTop: 30,
    paddingBottom: 5,
  },
  alertDialog: {
    height: 200,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  background: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000AA',
  },
});
