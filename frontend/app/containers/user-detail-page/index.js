/*
 * Home page
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectCurrentUser,
} from '../main/selectors';

import UserProfileWithData from './graphql/queries';

export class UserDetailPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    params: React.PropTypes.object,
  }

  componentDidMount() {
  }

  render() {
    const { userId } = this.props.params;

    return (
      <UserProfileWithData
        userId={userId}
      />
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
export default connect(mapStateToProps, mapDispatchToProps)(UserDetailPage);
