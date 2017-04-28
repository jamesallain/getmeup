/*
 * Home page
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectCurrentUser,
} from '../main/selectors';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: React.PropTypes.object,
  }

  render() {
    return (
      <div style={styles}>This is home page</div>
    );
  }
}

export function mapDispatchToProps() {
  return {

  };
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

const styles = {
  background: 'red',
  float: 'right',
};
