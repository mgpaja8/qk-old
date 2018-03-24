import React, { Component } from 'react';
import { Dimensions, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userCheckedIn, signOut, assignTasks, tryAgainCheckIn } from '../actions/actions';
import { shiftStationKey } from '../lib/utils';

import Initials from '../components/Initials';

import { Navigator } from 'react-native-navigation';
import { EmployeeType, OperationType } from '../types/qkTypes';

import style from '../styles/checkIn';
import { color } from '../styles/variables';

const checkInImage = require('../../assets/images/Check_In/ic_check_in.png');
const deviceChatBubblesImage = require('../../assets/images/Device_Chat_Bubbles/Device_Chat_Bubbles.png');

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
    assignTasks: (
      operationId: string,
      employeeCode: string,
      taskGroupings: {
        shift: string,
        station: string
      }[],
      navigator: Navigator
    ) => void;
    tryAgainCheckIn: () => void;
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
    const { operation, employee } = this.props;
    const taskGroupings = this.state.taskGroups.reduce((acc, td) => {
      if(td.selected) {
        acc.push({
          shift: td.shift,
          station: td.station
        });
      }

      return acc;
    }, []);

    if(taskGroupings.length) {
      this.props.actions.assignTasks(
        operation.id,
        employee.code,
        taskGroupings,
        this.props.navigator
      );
    }
  }

  onTryAgainPress = () => {
    this.props.actions.tryAgainCheckIn();
  }

  onTaskGroupButtonPress(shift: string, station: string) {
    let newState = [...this.state.taskGroups];
    newState.map(td => {
      if (td.shift === shift && td.station === station) {
        td.selected = !td.selected;
      }
      return td;
    });

    this.setState({
      taskGroups: newState
    });
  }

  render() {
    const { assignTasksError } = this.props.tasks;

    // if error happened during assigning tasksState
    if (assignTasksError) {
      return this.renderCheckInError();
    }

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

    // if we dont have any task groups show spinner
    if(taskGroups.length === 0) {
      return (
        <View style={style.loadingBodyContainer}>
          <ActivityIndicator size="small" color={color.primary} />
        </View>
      );
    }

    return (
      <View style={style.bodyContainer}>
        {
          taskGroups.map((t,i) => {
            return this.renderTaskGroupButton(t, i);
          })
        }
      </View>
    );
  }

  renderTaskGroupButton(taskGroup: TaskGroup, i: number) {
    const { shift, station, enabled, selected } = taskGroup;
    const { width } = Dimensions.get('window');
    const finalWidth = (width - 15) / 2;

    const textStyle = !enabled
                        ? style.disabledText
                        : selected
                            ? style.selectedText
                            : style.taskGroupButtonText;

    return (
      <TouchableOpacity
        key={i}
        style={[style.taskGroupButton, { width: finalWidth }, selected && style.selectedButton]}
        onPress={() => this.onTaskGroupButtonPress(shift, station)}
        disabled={!enabled}
      >
        <Text
          style={textStyle}
          numberOfLines={1}
        >
          {shift + ' ' + station}
        </Text>
      </TouchableOpacity>
    );
  }

  renderCheckInButton() {
    const { assignTasksFetching } = this.props.tasks;

    if (assignTasksFetching) {
      return (
        <View style={style.checkInButtonContainerView}>
          <ActivityIndicator size='small' color='white' />
        </View>
      );
    }

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

  renderCheckInError() {
    return (
      <View style={style.errorContainer}>
        <Text style={style.errorTitleText}>
          Check In Failed
        </Text>
        <View style={style.errorImageView}>
          <Image source={deviceChatBubblesImage} />
        </View>
        <Text style={style.errorText}>
          Oops, it looks like we were not able to check you in. Please flag down a
          manager for help. If they can't fix it, please contact our customer
          support and we'll be happy to help.
        </Text>
        <TouchableOpacity
          style={style.tryAgainButton}
          onPress={this.onTryAgainPress}
        >
          <Text style={style.tryAgainText}>
            Try Again
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
		actions: bindActionCreators({
      userCheckedIn,
      signOut,
      assignTasks,
      tryAgainCheckIn
    }, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckIn);
