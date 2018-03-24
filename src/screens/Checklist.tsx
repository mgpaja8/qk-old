import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Checklist extends Component {
  constructor(props) {
    super(props);

    props.navigator.setDrawerEnabled({
      side: 'left',
      enabled: true
    });
  }

  render() {
    return(
      <View style={{paddingTop: 20}}>
        <Text>
          Checklist
        </Text>
      </View>
    );
  }
}
