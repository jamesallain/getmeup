/*
 * Login page
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
  }

  render() {
    return (
      <div style={styles}>
        This is home page
      </div>
    );
  }
}

export function mapDispatchToProps() {
  return {
  };
}

const mapStateToProps = createStructuredSelector({
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

const styles = {
  background: 'red',
  float: 'right',
};
