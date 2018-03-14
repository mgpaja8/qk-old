import React, { Component } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkDevice } from '../actions/actions';
import DeviceInfo from 'react-native-device-info';
import { goToSignIn } from '../lib/navigation';
import style from '../styles/deviceRegistration';
import { color } from '../styles/variables';

const deviceChatBubblesImage = require('../../assets/images/Device_Chat_Bubbles/Device_Chat_Bubbles.png');

export interface DeviceStateTypes {
  deviceName?: string;
  isFetching?: boolean;
  isRegistered?: boolean;
}

export interface DeviceRegistrationPropTypes {
  actions: {
    checkDevice: (deviceName: string) => void;
  }
  device: DeviceStateTypes;
  navigator?: any;
}

class DeviceRegistration extends Component<DeviceRegistrationPropTypes> {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.device.isRegistered) {
      goToSignIn(nextProps.navigator);
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.actions.checkDevice(DeviceInfo.getDeviceName());
  }

  render() {
    const { device } = this.props;

    if (device.isFetching) {
      return this.renderActivityIndicator();
    }

    if (!device.isRegistered) {
      return this.renderRegistrationError();
    }

    return null;
  }

  renderActivityIndicator() {
    const { containerView } = style;
    return(
      <SafeAreaView style={containerView}>
        <ActivityIndicator
          size='large'
          color={color.primary}
        />
      </SafeAreaView>
    );
  }

  renderRegistrationError() {
    const {
      containerView,
      registrationFailedText,
      imageView,
      errorText
    } = style;

    return(
      <SafeAreaView style={containerView}>
        <Text style={registrationFailedText}>
          Registration Failed
        </Text>
        <View style={imageView}>
          <Image source={deviceChatBubblesImage} />
        </View>
        <Text style={errorText}>
          Oops, it looks like your device failed to register. Please flag down a
          manager for help. If they can't fix it, please contact our customer
          support and we'll be happy to help.
        </Text>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state, ownProps) {
	return {
		device: state.device
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ checkDevice }, dispatch)
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(DeviceRegistration);
