/*
 * Home page
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MenuLeftDrawer from '../../components/menu-left-drawer';

import {
  makeSelectCurrentUser,
} from '../main/selectors';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: React.PropTypes.object,
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div style={styles}>
        <MenuLeftDrawer
          user={currentUser}
        />
        <p>This is home page</p>
      </div>
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
