import React, { Component } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setChecklist, setMenuItem } from '../actions/actions';

import Pill from '../components/Pill';

import { Navigator } from 'react-native-navigation';
import { EmployeeType } from '../types/qkTypes';

import style from '../styles/menu';

const assignmentImage = require('../../assets/images/Assignment/ic_assignment_ind.png');
const settingsImage = require('../../assets/images/Settings/ic_settings.png');
const warningImage = require('../../assets/images/Warning/ic_warning.png');

export interface MenuPropType {
  actions: {
    setChecklist: (shift: string, station: string) => void;
    setMenuItem: (
      screen: string,
      shift?: string,
      station?: string
    ) => void;
  }
  navigator?: Navigator;
  dispatch?: any;
  employee: EmployeeType;
  tasks: any;
  menu: any;
}

class Menu extends Component<MenuPropType> {
  onTaskGroupPress(shift: string, station: string) {
    this.props.actions.setChecklist(shift, station);
    this.props.actions.setMenuItem('Checklist', shift, station);
  }

  onIncidentCenterPress = () => {
    console.log('Incident Center Pressed');
    this.props.actions.setMenuItem('Incidents');
  }

  onSwitchChecklistPress = () => {
    console.log('SwitchChecklist Pressed');
    this.props.actions.setMenuItem('SwitchChecklist');
  }

  onSettingsPress = () => {
    console.log('Settings Pressed');
    this.props.actions.setMenuItem('Settings');
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.tasks.taskGroups && !nextProps.menu.screen) {
      // Set first task group item as selected in the menu
      const { taskGroups } = nextProps.tasks;
      const taskGroup = taskGroups[Object.keys(taskGroups)[0]];

      this.props.actions.setMenuItem('Checklist', taskGroup.shift, taskGroup.station);
    }
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
        <ScrollView>
          {Object.keys(taskGroups).map(tg => this.renderTaskGroup(taskGroups[tg]))}
          {this.renderIncidentsLink()}
          {this.renderSwitchChecklistLink()}
          {this.renderSettingsLink()}
        </ScrollView>
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
    const selected = this.props.menu.screen === 'Checklist' &&
                     this.props.menu.shift === shift &&
                     this.props.menu.station === station
                      ? true
                      : false;

    const containerStyle = selected
                            ? [style.menuItemContainer, style.selectedMenuItem]
                            : [style.menuItemContainer];

    return (
      <TouchableOpacity
        key={`${shift}${station}`}
        onPress={() => this.onTaskGroupPress(shift, station)}
      >
        <View style={containerStyle}>
          {selected && <Image source={assignmentImage} style={style.iconStyleSelected}/>}
          <Text style={[style.whiteText, { flex: 1 }, !selected && { marginLeft: 29 }]}>
            {`${shift} ${station}`}
          </Text>
          <Pill text={total}/>
        </View>
      </TouchableOpacity>
    );
  }

  renderIncidentsLink() {
    const containerStyle = this.props.menu.screen === 'Incidents'
                            ? [style.menuItemContainer, style.selectedMenuItem]
                            : [style.menuItemContainer];

    return (
      <TouchableOpacity
        onPress={this.onIncidentCenterPress}
      >
        <View style={containerStyle}>
          <Image source={warningImage} style={style.iconStyle}/>
          <Text style={[style.whiteText, { flex: 1 }]}>
            Incident Center
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderSwitchChecklistLink() {
    const containerStyle = this.props.menu.screen === 'SwitchChecklist'
                            ? [style.menuItemContainer, style.selectedMenuItem]
                            : [style.menuItemContainer];

    return (
      <TouchableOpacity
        onPress={this.onSwitchChecklistPress}
      >
        <View style={containerStyle}>
          <Image source={assignmentImage} style={style.iconStyle}/>
          <Text style={[style.whiteText, { flex: 1 }]}>
            Switch Checklist
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderSettingsLink() {
    const containerStyle = this.props.menu.screen === 'Settings'
                            ? [style.menuItemContainer, style.selectedMenuItem]
                            : [style.menuItemContainer];

    return (
      <TouchableOpacity
        onPress={this.onSettingsPress}
      >
        <View style={containerStyle}>
          <Image source={settingsImage} style={style.iconStyle}/>
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
    tasks: state.tasks,
    menu: state.menu
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({
      setChecklist,
      setMenuItem
    }, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
