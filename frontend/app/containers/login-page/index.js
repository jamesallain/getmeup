/*
 * Login page
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  changeFieldValue,
  submitLoginForm,
} from './actions';

import {
  makeSelectLoginInfo,
} from './selectors';

import LoginMutation from './graphql/mutations';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    onChangeFieldValue: React.PropTypes.func,
    onSubmitLoginForm: React.PropTypes.func,
    loginInfo: React.PropTypes.object,
  }

  render() {
    const {
      onChangeFieldValue,
      onSubmitLoginForm,
      loginInfo,
    } = this.props;
    return (
      <LoginMutation
        onChangeFieldValue={onChangeFieldValue}
        onSubmitLoginForm={onSubmitLoginForm}
        loginInfo={loginInfo}
      />
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onChangeFieldValue: (e) => dispatch(changeFieldValue(e)),
    onSubmitLoginForm: (loginInfo) => dispatch(submitLoginForm(loginInfo)),
  };
}

const mapStateToProps = createStructuredSelector({
  loginInfo: makeSelectLoginInfo(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

