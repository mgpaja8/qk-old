export function goToSignIn(navigator: any) {
  navigator.resetTo({
      screen: 'SignIn',
      animated: true,
      animationType: 'fade',
      navigatorStyle: {
        navBarHidden: true
      }
    });
}
