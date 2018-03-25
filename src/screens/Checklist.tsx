import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signOut } from '../actions/actions';

import { color } from '../styles/variables';

export interface ChecklistPropType {
  actions: {
    signOut: () => void;
  }
  navigator?: any;
  dispatch?: any;
  checklist: {
    shift: string,
    station: string
  }
  tasks: any;
}

class Checklist extends Component<ChecklistPropType> {
  static navigatorStyle = {
    navBarTextColor: color.primary,
    navBarTextFontSize: 16,
    navBarButtonColor: color.primary
  };

  static navigatorButtons = {
    rightButtons: [
      {
        icon: require('../../assets/images/Exit/ic_exit_to_app.png'),
        id: 'exit'
      }
    ],
    leftButtons: [
      {
        icon: require('../../assets/images/Menu/ic_menu.png'),
        id: 'menu'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.props.navigator.setDrawerEnabled({
      side: 'left',
      enabled: true
    });
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'exit') {
        this.props.actions.signOut();
        this.props.navigator.resetTo({
          screen: 'SignIn',
          animated: true,
          animationType: 'fade',
          navigatorStyle: {
            navBarHidden: true
          }
        });
      }
      if (event.id == 'menu') {
        this.props.navigator.toggleDrawer({
          side: 'left',
          animated: true,
          to: 'open'
        });
      }
    }
  }

  componentWillMount() {
    const { shift, station } = this.props.checklist;
    this.setTitle(shift, station, this.props.navigator);
  }

  componentWillReceiveProps(nextProps) {
    const { shift, station } = nextProps.checklist;
    this.setTitle(shift, station, nextProps.navigator);
  }

  setTitle(shift: string, station: string, navigator: any) {
    navigator.setTitle({
      title: `${shift} ${station}`
    });
  }

  render() {
    return (
      <SafeAreaView>
        <Text>
          Checklist
        </Text>
        {this.props.checklist.shift && <Text>{this.props.checklist.shift}</Text>}
        {this.props.checklist.station && <Text>{this.props.checklist.station}</Text>}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state, ownProps) {
	return {
		checklist: state.checklist,
    tasks: state.tasks
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({
      signOut
    }, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Checklist);
