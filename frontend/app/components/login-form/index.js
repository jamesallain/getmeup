/*
 * Login Form
 */

import React from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default class LoginForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    onChangeFieldValue: React.PropTypes.func,
    login: React.PropTypes.func,
    loginInfo: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);
    this.changeFieldValue = this.changeFieldValue.bind(this);
    this.submitLoginForm = this.submitLoginForm.bind(this);
  }

  changeFieldValue(e) {
    e.preventDefault();
    this.props.onChangeFieldValue(e);
  }

  submitLoginForm(e) {
    e.preventDefault();
    const { loginInfo, login } = this.props;
    login(loginInfo.get('email'), loginInfo.get('password'));

    // this.props.onLoginSuccess();
  }

  render() {
    return (
      <Card style={styles.container}>
        <form
          action="/"
          style={styles.form}
          onSubmit={this.submitLoginForm}
        >
          <div>
            <TextField
              floatingLabelText="Email"
              name="email"
              style={styles.fields}
              onChange={this.changeFieldValue}
            />
          </div>
          <div>
            <TextField
              floatingLabelText="Password"
              type="password"
              name="password"
              style={styles.fields}
              onChange={this.changeFieldValue}
            />
          </div>
        </form>

        <div style={styles.loginBtn}>
          <RaisedButton
            type="submit"
            label={<FormattedMessage {...messages.loginButtonLabel} />}
            primary
            onTouchTap={this.submitLoginForm}
          />
        </div>

        <CardText>Or <Link to={'/signup'}>Sign up</Link></CardText>
      </Card>
    );
  }
}

const styles = {
  form: {
    textAlign: 'center',
  },
  fields: {
    width: '100%',
  },
  loginBtn: {
    marginTop: 20,
  },
  container: {
    margin: '15%',
    padding: '7%',
    backgroundColor: '#fff',
    fontSize: 16,
  },
};
