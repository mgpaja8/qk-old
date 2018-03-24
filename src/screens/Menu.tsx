import React, { Component } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setChecklist } from '../actions/actions';

import Pill from '../components/Pill';

import { Navigator } from 'react-native-navigation';
import { EmployeeType } from '../types/qkTypes';

import style from '../styles/menu';

export interface MenuPropType {
  actions: {
    setChecklist: (shift: string, station: string) => void;
  }
  navigator?: Navigator;
  dispatch?: any;
  employee: EmployeeType;
  tasks: any;
}

class Menu extends Component<MenuPropType> {
  onTaskGroupPress(shift: string, station: string) {
    this.props.actions.setChecklist(shift, station);
  }

  onIncidentCenterPress = () => {
    console.log('Incident Center Pressed');
  }

  onSwitchChecklistPress = () => {
    console.log('SwitchChecklist Pressed');
  }

  onSettingsPress = () => {
    console.log('Settings Pressed');
  }

  render() {
    const { taskGroups } = this.props.tasks;
    const { employee } = this.props;

    if (!taskGroups || !employee) {
      return (
        <SafeAreaView style={style.container}>
          <ActivityIndicator size='small' />
        </SafeAreaView>
      );
    }

    return(
      <SafeAreaView style={style.container}>
        {this.renderHeader()}
        {Object.keys(taskGroups).map(tg => this.renderTaskGroup(taskGroups[tg]))}
        {this.renderIncidentsLink()}
        {this.renderSwitchChecklistLink()}
        {this.renderSettingsLink()}
      </SafeAreaView>
    );
  }

  renderHeader() {
    const { initials, fullName, role } = this.props.employee;

    return (
      <View style={style.headerContainer}>
        <Pill text={initials}/>
        <View style={style.employeeContainer}>
          <Text style={style.whiteText}>
            {fullName}
          </Text>
          <Text style={style.whiteText}>
            {role}
          </Text>
        </View>
      </View>
    );
  }

  renderTaskGroup(taskGroup: any) {
    const { shift, station, inprogress, unassigned } = taskGroup;
    const total = inprogress.total + unassigned.total;

    return (
      <TouchableOpacity
        key={`${shift}${station}`}
        onPress={() => this.onTaskGroupPress(shift, station)}
      >
        <View style={style.menuItemContainer}>
          <Text style={[style.whiteText, { flex: 1 }]}>
            {`${shift} ${station}`}
          </Text>
          <Pill text={total}/>
        </View>
      </TouchableOpacity>
    );
  }

  renderIncidentsLink() {
    return (
      <TouchableOpacity
        onPress={this.onIncidentCenterPress}
      >
        <View style={style.menuItemContainer}>
          <Text style={[style.whiteText, { flex: 1 }]}>
            Incident Center
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderSwitchChecklistLink() {
    return (
      <TouchableOpacity
        onPress={this.onSwitchChecklistPress}
      >
        <View style={style.menuItemContainer}>
          <Text style={[style.whiteText, { flex: 1 }]}>
            Switch Checklist
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderSettingsLink() {
    return (
      <TouchableOpacity
        onPress={this.onSettingsPress}
      >
        <View style={style.menuItemContainer}>
          <Text style={[style.whiteText, { flex: 1 }]}>
            Settings
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
      setChecklist
    }, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
