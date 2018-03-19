import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { color } from '../styles/variables';

export interface PropTypes {
  initials: string;
}

const style = StyleSheet.create({
  containerView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 5,
    backgroundColor: color.secondary,
    padding: 5
  },
  text: {
    fontSize: 14,
    color: 'white'
  }
});

export default class Initials extends Component<PropTypes> {
  render() {
    return (
      <View style={style.containerView}>
        <Text style={style.text}>
          {this.props.initials}
        </Text>
      </View>
    );
  }
}
