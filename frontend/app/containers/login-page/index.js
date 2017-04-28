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

import routePaths from '../../route-paths';
import {
  isUserAuthenticated,
} from '../../utils/auth';

import {
  makeSelectLoginInfo,
} from './selectors';

import LoginMutation from './graphql/mutations';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loginInfo: React.PropTypes.object,
    onChangeFieldValue: React.PropTypes.func,
    onLoginSuccess: React.PropTypes.func,
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired,
    }).isRequired,
  }

  componentWillMount() {
    if (isUserAuthenticated()) { // redirect to home path if logged in
      this.props.router.push(routePaths.getHomePath());
    }
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
    onLoginSuccess: (user) => dispatch(loginSuccess(user)),
  };
}

const mapStateToProps = createStructuredSelector({
  loginInfo: makeSelectLoginInfo(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

