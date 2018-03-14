import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import * as Animatable from 'react-native-animatable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signIn } from '../actions/actions';

import CodeField from '../components/CodeField';
import DigitButton from '../components/DigitButton';

import { EmployeeType, SelectedOperationStateType } from '../types/qkTypes';

import style from '../styles/signIn';

export interface UserStateType {
  employee?: EmployeeType;
  isFetching: boolean;
  isLoggedIn: boolean;
}

export interface SignInPropType {
  actions: {
    signIn: (operationId: string, code: string) => void;
  }
  navigator?: any;
  user: UserStateType;
  selectedOperation: SelectedOperationStateType;
}

export interface SignInStateType {
  code: Array<number>;
}

class SignIn extends Component<SignInPropType, SignInStateType> {
  codeViewRef: any = null;

  constructor(props) {
    super(props);

    this.state = {
      code: []
    }
  }

  clearCode(): void {
    this.codeViewRef.shake(750)
      .then(() => {
        this.setState({
          code: []
        });
      });
  }

  handleOnPress(digit): void {
    const { code } = this.state;

    let newCode = [...code, digit];
    this.setState({
      code: newCode
    }, () => {
      if (this.state.code.length === 4) {
        //this.props.actions.signIn(this.props.selectedOperation.id, this.state.code.join(''));
      }
    });
    console.log('Pressed => ', digit);
  }

  render() {
    const { containerView } = style;
    return(
      <SafeAreaView style={containerView}>
        {this.renderText()}
        {this.renderCodeFields()}
        {this.renderDigits()}
      </SafeAreaView>
    );
  }

  renderText() {
    // const { isFetching } = this.props.user;
    // const { textWeightNormal } = styleCommon;
    //
    // if (isFetching) {
    //   return <ActivityIndicator size="small" color={colors.primary} />;
    // }

    return <Text>Enter employee code</Text>;
  }

  renderDigits() {
    const { rowContainerView } = style;
    const disabled = this.state.code.length === 4 ? true : false;

    return(
      <View>
        <View style={rowContainerView}>
          <DigitButton
            onPress={() => this.handleOnPress(1)}
            text={'1'}
            disabled={disabled}
          />
          <DigitButton
            onPress={() => this.handleOnPress(2)}
            text={'2'}
            disabled={disabled}
          />
          <DigitButton
            onPress={() => this.handleOnPress(3)}
            text={'3'}
            disabled={disabled}
          />
        </View>
        <View style={rowContainerView}>
          <DigitButton
            onPress={() => this.handleOnPress(4)}
            text={'4'}
            disabled={disabled}
          />
          <DigitButton
            onPress={() => this.handleOnPress(5)}
            text={'5'}
            disabled={disabled}
          />
          <DigitButton
            onPress={() => this.handleOnPress(6)}
            text={'6'}
            disabled={disabled}
          />
        </View>
        <View style={rowContainerView}>
          <DigitButton
            onPress={() => this.handleOnPress(7)}
            text={'7'}
            disabled={disabled}
          />
          <DigitButton
            onPress={() => this.handleOnPress(8)}
            text={'8'}
            disabled={disabled}
          />
          <DigitButton
            onPress={() => this.handleOnPress(9)}
            text={'9'}
            disabled={disabled}
          />
        </View>
        <View style={rowContainerView}>
          <DigitButton
            onPress={() => this.handleOnPress(0)}
            text={'0'}
            disabled={disabled}
          />
        </View>
      </View>
    );
  }

  renderCodeFields() {
    const { rowContainerView } = style;
    const { code } = this.state;
    const emptyFields = [0, 0, 0, 0];

    return(
      <Animatable.View
        ref={ref => this.codeViewRef = ref}
        style={rowContainerView}
      >
        {
          emptyFields.map((e, i) => {
            if(code[i] !== undefined) {
              return <CodeField key={i} filled/>;
            }
            return <CodeField key={i}/>;
          })
        }
      </Animatable.View>
    );
  }
}

function mapStateToProps(state, ownProps) {
	return {
		user: state.user,
    selectedOperation: state.selectedOperation
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ signIn }, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
