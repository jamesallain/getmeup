/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { connect } from 'react-redux';
import { StyleRoot } from 'radium';
import { Socket } from 'phoenix';
import { createStructuredSelector } from 'reselect';
import ContactsRightDrawer from '../../components/contacts-right-drawer';
import {
  isUserAuthenticated,
  getToken,
} from '../../utils/auth';

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  componentDidMount() {
    const socket = new Socket('ws://localhost:9191/socket', {
      params: { token: getToken() },
    });
    socket.connect();

    const channel = socket.channel('users:online', {});
    channel.join()
      .receive('ok', (resp) => {
        console.log("Joined successfully", resp)
      })
      .receive('error', (resp) => {
        console.log("Unable to join", resp)
      });

    channel.on('user_joined', (msg) => console.log({msg}));
  }

  render() {
    // const {  } = this.props;
    // const componentStyle = isUserAuthenticated() ? 'show' : 'hide';
    return (
      <StyleRoot>
        <section>
          {React.Children.toArray(this.props.children)}
        </section>
        <section>
          <ContactsRightDrawer

          />
        </section>
      </StyleRoot>
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
export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = {
  contactsRightDrawer: {
    show: {
      display: 'block',
    },
    hide: {
      display: 'none',
    },
  },
};
