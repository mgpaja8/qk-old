import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { color } from '../styles/variables';

export interface PropTypes {
  text: string;
  containerStyle?: any;
  textStyle?: any;
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

export default class Pill extends Component<PropTypes> {
  render() {
    const {
      containerStyle = {},
      textStyle = {}
    } = this.props;

    return (
      <View style={[style.containerView, containerStyle]}>
        <Text style={[style.text, textStyle]}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}
