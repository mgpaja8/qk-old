import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userCheckedIn, signOut } from '../actions/actions';
import { shiftStationKey } from '../lib/utils';

import Initials from '../components/Initials';

import { EmployeeType, OperationType } from '../types/qkTypes';

import style from '../styles/checkIn';
import { color } from '../styles/variables';

const checkInImage = require('../../assets/images/Check_In/ic_check_in.png');

export interface TaskGroup {
  shift: string;
  station: string;
  selected: boolean;
  enabled: boolean;
}

export interface CheckInPropType {
  actions: {
    userCheckedIn: (taskGroups: string[]) => void;
    signOut: () => void;
  }
  navigator?: any;
  dispatch?: any;
  employee: EmployeeType;
  tasks: any;
  operation: OperationType;
}

export interface CheckInStateType {
  taskGroups: TaskGroup[];
}

class CheckIn extends Component<CheckInPropType, CheckInStateType> {
  constructor(props) {
    super(props);

    this.state = {
      taskGroups: []
    };
  }

  componentWillMount() {
    const { employee } = this.props;
    const { taskGroups } = this.props.tasks;

    const checkedInGroups = Object.keys(taskGroups).reduce((acc, key) => {
      const group = taskGroups[key];
      const assigned = group.assignedEmployees.find(e => {
        return e.code === employee.code;
      });

      if(assigned) {
        return acc.concat([key]);
      }

      return acc;
    }, []);

    // if employee is checked in open checklist screen
    if(checkedInGroups.length > 0) {
      this.props.actions.userCheckedIn(checkedInGroups);
      this.props.navigator.resetTo({
        screen: 'Checklist',
        animated: true,
        animationType: 'fade',
        navigatorStyle: {
          navBarHidden: true
        }
      });
    }
  }

  componentDidMount() {
    const { taskGroups } = this.props.tasks;
    const { shifts, stations } = this.props.operation;
    let newState = [];

    shifts.map(shift => {
      stations.map(station => {
        const key = shiftStationKey(shift.name, station);
        if(taskGroups.hasOwnProperty(key)) {
          const { inprogress, unassigned } = taskGroups[key];
          let enabled = false;
          if(inprogress.total > 0 || unassigned.total > 0) {
            enabled = true;
          }

          newState = [...newState, {
            shift: shift.name,
            station,
            enabled,
            selected: false
          }];
        }
      });
    });

    this.setState({
      taskGroups: newState
    });
  }

  shouldComponentUpdate(nextProps, nextState): boolean {
    if (!nextProps.employee) {
      return false;
    }

    return true;
  }

  onSignOut = () => {
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

  onCheckInPress = () => {
    console.log('check in pressed');
  }

  render() {
    console.log(this.state, Date.now());
    return(
      <SafeAreaView style={style.containerView}>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderCheckInButton()}
      </SafeAreaView>
    );
  }

  renderHeader() {
    const { employee } = this.props;
    return (
      <View style={style.headerContainerView}>
        <Text style={style.checkingInText}>
          Checking in as
        </Text>
        <View style={style.infoContainerView}>
          <View style={style.leftContainerView}>
            <Initials initials={employee.initials}/>
            <View style={style.employeeContainerView}>
              <Text style={style.employeeText}>
                {employee.fullName}
              </Text>
              <Text style={style.employeeText}>
                {employee.role}
              </Text>
            </View>
          </View>
          <View style={style.notYouContainerView}>
            <TouchableOpacity
              style={style.notYouButton}
              onPress={this.onSignOut}
            >
              <Text style={style.notYouText}>
                Not you?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  renderBody() {
    const { taskGroups } = this.state;
    if(taskGroups.length === 0) {
      return (
        <View style={style.loadingBodyContainer}>
          <ActivityIndicator size="small" color={color.primary} />
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        {
          taskGroups.map((t,i) => {
            return this.renderTaskGroupButton(t, i);
          })
        }
      </View>
    );
  }

  renderTaskGroupButton(taskGroup: TaskGroup, i: number) {
    return (
      <Text key={i}>
        {taskGroup.shift + ' ' + taskGroup.station}
      </Text>
    );
  }

  renderCheckInButton() {
    return (
      <View style={style.checkInButtonContainerView}>
        <TouchableOpacity
          onPress={this.onCheckInPress}
          style={style.checkInButton}
        >
          <Image source={checkInImage} />
          <Text style={style.checkInButtonText}>
            Check in as {this.props.employee.fullName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
	return {
		employee: state.user.employee,
    tasks: state.tasks,
    operation: state.operation.operation
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ userCheckedIn, signOut }, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckIn);
