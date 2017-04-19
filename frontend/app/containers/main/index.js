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
import routePaths from '../../route-paths';
import ContactsRightDrawer from '../../components/contacts-right-drawer';
import {
  isUserAuthenticated,
  getToken,
} from '../../utils/auth';

import {
  syncPresenceState,
  updatePresenceDiff,
} from './actions';

import {
  makeSelectPresence,
  makeSelectConnected,
} from './selectors';

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    presence: React.PropTypes.object,
    connected: React.PropTypes.bool,
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired,
    }).isRequired,

    onSyncPresenceState: React.PropTypes.func,
    onUpdatePresenceDiff: React.PropTypes.func,
  };

  componentDidMount() {
    if (!isUserAuthenticated()) {
      this.props.router.push(routePaths.getLoginPath());
      return;
    }

    const { connected } = this.props;
    if (isUserAuthenticated() && !connected) {
      this.handleSocket();
    }
  }

  handleSocket() {
    const socket = new Socket('ws://localhost:9191/socket', {
      params: { token: getToken() },
    });
    socket.connect();
    socket.conn.onerror = () => {
      console.log('Cannot connect to server');
      // TODO: dispatch action to global error handling
      // Because no way to get response content of socket from browser, we're assuming the error is unauthorization and navigate user to login page
    };

    const channel = socket.channel('users:online', {});
    channel.join()
      .receive('ok', (resp) => {
        console.log('Joined successfully', resp);
      })
      .receive('error', (resp) => {
        console.log('Unable to join', resp);
      });

    channel.on('presence_state', (initialPresence) => this.props.onSyncPresenceState(initialPresence));
    channel.on('presence_diff', (diff) => this.props.onUpdatePresenceDiff(diff));
  }

  extractUsersInfoFromPresence(presence) {
    const userIds = Object.keys(presence);
    return userIds.map((userId) => ({
      id: userId,
      name: presence[userId].metas[0].name,
    }));
  }

  render() {
    const { presence } = this.props;
    const users = this.extractUsersInfoFromPresence(presence.toJS());
    const contactsRightDrawerStyle = isUserAuthenticated() ? 'show' : 'hide';
    return (
      <StyleRoot>
        <section>
          {React.Children.toArray(this.props.children)}
        </section>
        <section
          style={styles.contactsRightDrawer[contactsRightDrawerStyle]}
        >
          <ContactsRightDrawer
            users={users}
          />
        </section>
      </StyleRoot>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onSyncPresenceState: (initialPresence) => dispatch(syncPresenceState(initialPresence)),
    onUpdatePresenceDiff: (diff) => dispatch(updatePresenceDiff(diff)),
  };
}

const mapStateToProps = createStructuredSelector({
  presence: makeSelectPresence(),
  connected: makeSelectConnected(),
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
