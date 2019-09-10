import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {ActionCreator} from '../Redux/DataGovAction';

import LoadingIndicator from '../Components/LoadingIndicator';
import MobileDataItemView from '../Components/MobileDataItemView';
import StandardList from '../Components/StandardList';
import VerticalTitle from '../Components/VerticalTitle';
import GeneralModal from '../Components/GeneralModal';

export class MobileDataScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flatListReady: false,
      showModal: false,
      modalContent: null,
    };
  }

  componentDidMount() {
    this.props.fetchMobileDataUsage();
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screen}>
          <View style={styles.title}>
            <VerticalTitle />
          </View>
          <View style={styles.listWrapper}>
            {this.props.data ? (
              <StandardList
                style={styles.standardList}
                data={this.props.data}
                renderItem={({item}) => this._renderItem({item})}
                isRefreshing={this.props.isLoading}
                onEndReached={() => this._loadMore()}
                onScroll={this._scrolled.bind(this)}
                onRefresh={() => this.props.refreshMobileDataUsage()}
              />
            ) : (
              undefined
            )}
          </View>
        </View>
        {this.props.error ? this._showError(this.props.error) : undefined}
        {this.props.isLoading ? (
          <LoadingIndicator isLoading={this.props.isLoading} />
        ) : (
          undefined
        )}
        {this.state.modalContent ? (
          <GeneralModal
            isVisible={true}
            onDismiss={() => this._onDismissModal()}
            title={'Usage decreased in '}
            content={this._buildModalContent(
              this.state.modalContent.decreasedQuarter,
            )}
          />
        ) : (
          undefined
        )}
      </SafeAreaView>
    );
  }

  _showError(error) {
    const isNetworkError =
      !error.status &&
      error.message &&
      error.message === 'Network request failed';
    return (
      <GeneralModal
        isVisible={true}
        onDismiss={() => {
          isNetworkError ? this.props.fetchMobileDataUsage() : null;
        }}
        title={isNetworkError ? error.message : "Oops, It's error"}
        content={error.status ? this.props.error.status.toString() : '😢'}
        buttonText={isNetworkError ? 'REFRESH' : ''}
      />
    );
  }

  _renderItem = ({item}) => {
    return (
      <MobileDataItemView
        year={item.year}
        total={item.total}
        showIcon={item.decreasedQuarter.length > 0}
        onIconClicked={() => {
          this.setState({modalContent: item});
        }}
      />
    );
  };

  _onDismissModal() {
    this.setState({modalContent: null});
  }

  _buildModalContent(decreasedQuarters) {
    let content = '';
    decreasedQuarters.forEach(quarter => {
      if (content) {
        content += ' ';
      }
      content += 'Q' + quarter;
    });
    return content;
  }

  _scrolled = () => {
    if (this.state.flatListReady) {
      return null;
    }
    this.setState({flatListReady: true});
  };

  _loadMore = () => {
    if (this.props.isCompleted) {
      return null;
    }
    this.props.fetchMobileDataUsage();
  };
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screen: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listWrapper: {
    flex: 8,
  },
  standardList: {
    flex: 8,
    paddingLeft: 8,
    paddingRight: 15,
    paddingTop: 5,
  },
  listItemTitle: {
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isLoading: state.dataGov.isFetching,
    data: state.dataGov.data,
    error: state.dataGov.error,
    offset: state.dataGov.offset,
    isCompleted: state.dataGov.isCompleted,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMobileDataUsage() {
      return dispatch(ActionCreator.fetchMobileDataUsage());
    },
    refreshMobileDataUsage() {
      return dispatch(ActionCreator.refreshMobileDataUsage());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MobileDataScreen);
