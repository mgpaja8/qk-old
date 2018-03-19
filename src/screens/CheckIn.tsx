import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userCheckedIn, signOut } from '../actions/actions';

import Initials from '../components/Initials';

import { EmployeeType } from '../types/qkTypes';

import style from '../styles/checkIn';

export interface CheckInPropType {
  actions: {
    userCheckedIn: (taskGroups: string[]) => void;
    signOut: () => void;
  }
  navigator?: any;
  dispatch?: any;
  employee: EmployeeType;
  tasks: any;
}

class CheckIn extends Component<CheckInPropType> {
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

  shouldComponentUpdate(nextProps, nextState): boolean {
    if (!nextProps.employee) {
      return false;
    }

    return true;
  }

  signOut = () => {
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

  render() {
    return(
      <SafeAreaView style={style.containerView}>
        {this.renderHeader()}
        <View>
          <Text style={{backgroundColor: 'white'}}>
            StyleSheet
          </Text>
        </View>
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
              onPress={this.signOut}
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
}

function mapStateToProps(state, ownProps) {
	return {
		employee: state.user.employee,
    tasks: state.tasks
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ userCheckedIn, signOut }, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckIn);
