import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userCheckedIn } from '../actions/actions';

import { EmployeeType } from '../types/qkTypes';

export interface CheckInPropType {
  actions: {
    userCheckedIn: (taskGroups: string[]) => void;
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

  render() {
    return(
      <View style={{paddingTop: 20}}>
        <Text>
          CheckIn
        </Text>
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
		actions: bindActionCreators({ userCheckedIn }, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckIn);
