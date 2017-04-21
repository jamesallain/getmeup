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
import { createStructuredSelector } from 'reselect';
import routePaths from '../../route-paths';
import ContactsRightDrawer from '../../components/contacts-right-drawer';
import Header from '../../components/header';
import {
  isUserAuthenticated,
} from '../../utils/auth';

import { connectSocket } from '../../utils/socket';

import {
  syncPresenceState,
  updatePresenceDiff,
  updateCurrentUser,
} from './actions';

import {
  makeSelectPresence,
  makeSelectCurrentUser,
} from './selectors';

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    presence: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    if (!isUserAuthenticated()) {
      this.props.router.push(routePaths.getLoginPath());
      return;
    }
    this.checkAndConnectSocket();
  }

  componentDidUpdate() {
    this.checkAndConnectSocket();
  }

  checkAndConnectSocket() {
    const { currentUser } = this.props;
    if (isUserAuthenticated() && !currentUser) {
      connectSocket(this.props);
    }
  }

  extractUsersInfoFromPresence(presence) {
    const presenceObj = presence.toJS();
    const userIds = Object.keys(presenceObj);
    return userIds.map((userId) => ({
      id: userId,
      name: presenceObj[userId].metas[0].name,
      avatar: presenceObj[userId].metas[0].avatar,
    }));
  }

  render() {
    const { presence, currentUser } = this.props;
    const users = this.extractUsersInfoFromPresence(presence);
    const showHideLoggedInComponentsStyle = isUserAuthenticated() && currentUser ? 'show' : 'hide';
    return (
      <StyleRoot>
        <section>
          {React.Children.toArray(this.props.children)}
        </section>
        <section
          style={styles.contactsRightDrawer[showHideLoggedInComponentsStyle]}
        >
          <ContactsRightDrawer
            users={users}
          />
        </section>
        <section
          style={styles.header[showHideLoggedInComponentsStyle]}
        >
          <Header
            currentUser={currentUser}
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
    onUpdateCurrentUser: (user) => dispatch(updateCurrentUser(user)),
  };
}

const mapStateToProps = createStructuredSelector({
  presence: makeSelectPresence(),
  currentUser: makeSelectCurrentUser(),
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
  header: {
    show: {
      display: 'block',
    },
    hide: {
      display: 'none',
    },
  },
};
