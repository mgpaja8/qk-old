import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { color } from '../styles/variables';

export interface CodeFieldPropType {
  filled?: boolean;
}

export default class CodeField extends Component<CodeFieldPropType> {
  render() {
    const { containerView, backgroundColorPrimary } = style;
    const { filled } = this.props;
    return(
      <View style={[containerView, filled && backgroundColorPrimary]}>
      </View>
    );
  }
}

const style = StyleSheet.create({
  containerView: {
    height: 35,
    width: 35,
    margin: 2.5,
    borderRadius: 5,
    borderColor: color.primary,
    borderWidth: 1
  },
  backgroundColorPrimary: {
    backgroundColor: color.primary
  }
});
