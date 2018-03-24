import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export interface ChecklistPropType {
  // actions: {
  //   setChecklist: (shift: string, station: string) => void;
  // }
  navigator?: Navigator;
  dispatch?: any;
  checklist: {
    shift: string,
    station: string
  }
  tasks: any;
}

class Checklist extends Component<ChecklistPropType> {
  constructor(props) {
    super(props);

    props.navigator.setDrawerEnabled({
      side: 'left',
      enabled: true
    });
  }

  render() {
    console.log(this.props);
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

// function mapDispatchToProps(dispatch) {
// 	return {
// 		actions: bindActionCreators({
//       setChecklist
//     }, dispatch)
// 	};
// }

export default connect(mapStateToProps, null)(Checklist);
