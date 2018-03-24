import React, { Component } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Navigator } from 'react-native-navigation';
import { EmployeeType } from '../types/qkTypes';

export interface MenuPropType {
  navigator?: Navigator;
  dispatch?: any;
  employee: EmployeeType;
  tasks: any;
}

class Menu extends Component<MenuPropType> {
  onTaskGroupPress(shift: string, station: string) {
    console.log('Pressed ', shift, station);
  }

  render() {
    const { taskGroups } = this.props.tasks;

    if (!taskGroups) {
      return (
        <SafeAreaView>
          <ActivityIndicator size='small' />
        </SafeAreaView>
      );
    }

    return(
      <SafeAreaView>
        <Text>
          Menu
        </Text>
        {Object.keys(taskGroups).map(tg => this.renderTaskGroup(taskGroups[tg]))}
      </SafeAreaView>
    );
  }

  renderTaskGroup(taskGroup: any) {
    const { shift, station, inprogress } = taskGroup;
    const { total } = inprogress;

    return (
      <TouchableOpacity
        key={`${shift}${station}`}
        onPress={() => this.onTaskGroupPress(shift, station)}
      >
        <View>
          <Text>
            {`${shift} ${station}`}
          </Text>
          <Text>
            {total}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

function mapStateToProps(state, ownProps) {
	return {
		employee: state.user.employee,
    tasks: state.tasks
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({
    }, dispatch)
	};
}

export default connect(mapStateToProps, null)(Menu);
