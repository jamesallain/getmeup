/*
 * Login page
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ContactsDrawerRight from '../../components/contacts-drawer-right';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
  }

  render() {
    return (
      <ContactsDrawerRight />
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
  };
}

const mapStateToProps = createStructuredSelector({
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

