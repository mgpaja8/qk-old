import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { color } from '../styles/variables';

export interface DigitButtonPropType {
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

export default class DigitButton extends Component<DigitButtonPropType> {
  render() {
    const { containerView, buttonMargin, digitText } = style;

    const { text, onPress, disabled } = this.props;

    return(
      <TouchableOpacity
        onPress={onPress}
        style={buttonMargin}
        disabled={disabled}
      >
        <View style={containerView}>
          <Text style={digitText}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  containerView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: color.primary,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonMargin: {
    margin: 5
  },
  digitText: {
    color: color.primary,
    fontSize: 20
  }
});
