/*
 * Login page
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  changeFieldValue,
  loginSuccess,
} from './actions';

import {
  makeSelectLoginInfo,
} from './selectors';

import LoginMutation from './graphql/mutations';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loginInfo: React.PropTypes.object,
    onChangeFieldValue: React.PropTypes.func,
    onLoginSuccess: React.PropTypes.func,
  }

  render() {
    const {
      loginInfo,
      onChangeFieldValue,
      onLoginSuccess,
    } = this.props;
    return (
      <LoginMutation
        loginInfo={loginInfo}
        onChangeFieldValue={onChangeFieldValue}
        onLoginSuccess={onLoginSuccess}
      />
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onChangeFieldValue: (e) => dispatch(changeFieldValue(e)),
    onLoginSuccess: () => dispatch(loginSuccess()),
  };
}

const mapStateToProps = createStructuredSelector({
  loginInfo: makeSelectLoginInfo(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

