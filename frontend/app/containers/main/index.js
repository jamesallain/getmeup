/**
 *
 * main.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { connect } from 'react-redux';
import Radium, { StyleRoot } from 'radium';
import { createStructuredSelector } from 'reselect';
import routePaths from '../../route-paths';
import ContactsRightDrawer from '../../components/contacts-right-drawer';
import Header from '../../components/header';
import MenuLeftDrawer from '../../components/menu-left-drawer';
import {
  isUserAuthenticated,
} from '../../utils/auth';

import { connectSocket } from '../../utils/socket';

import {
  syncPresenceState,
  updatePresenceDiff,
  updateCurrentUser,
  clickRightIconOnToolbar,
  clickLeftIconOnToolbar,
} from './actions';

import {
  makeSelectPresence,
  makeSelectCurrentUser,
  makeSelectMostRecentOnlineContacts,
  makeSelectIsOpenRightDrawer,
  makeSelectIsOpenLeftDrawer,
} from './selectors';

@Radium
export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    mostRecentOnlineContacts: React.PropTypes.array,
    currentUser: React.PropTypes.object,
    isOpenRightDrawer: React.PropTypes.bool,
    isOpenLeftDrawer: React.PropTypes.bool,
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired,
    }).isRequired,

    onClickRightIconOnToolbar: React.PropTypes.func,
    onClickLeftIconOnToolbar: React.PropTypes.func,
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

  render() {
    const {
      currentUser,
      mostRecentOnlineContacts,
      isOpenRightDrawer,
      isOpenLeftDrawer,
      onClickRightIconOnToolbar,
      onClickLeftIconOnToolbar,
    } = this.props;

    const mainContentStyle = isOpenRightDrawer ? { ...styles.mainContent.base, ...styles.mainContent.open } : styles.mainContent.base;

    return (
      <StyleRoot>
        {isUserAuthenticated() && currentUser &&
          <section>
            <Header
              currentUser={currentUser}
              onClickRightIcon={onClickRightIconOnToolbar}
              onClickLeftIcon={onClickLeftIconOnToolbar}
            />
          </section>
        }

        <section style={mainContentStyle}>
          {React.Children.toArray(this.props.children)}
        </section>

        {isUserAuthenticated() && currentUser &&
          <section>
            <MenuLeftDrawer
              user={currentUser}
              isOpenLeftDrawer={isOpenLeftDrawer}
            />
          </section>
        }

        {isUserAuthenticated() && currentUser &&
          <section>
            <ContactsRightDrawer
              mostRecentOnlineContacts={mostRecentOnlineContacts}
              isOpenRightDrawer={isOpenRightDrawer}
            />
          </section>
        }
      </StyleRoot>
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
    onSyncPresenceState: (initialPresence) => dispatch(syncPresenceState(initialPresence)),
    onUpdatePresenceDiff: (diff) => dispatch(updatePresenceDiff(diff)),
    onUpdateCurrentUser: (user) => dispatch(updateCurrentUser(user)),
    onClickRightIconOnToolbar: () => dispatch(clickRightIconOnToolbar()),
    onClickLeftIconOnToolbar: () => dispatch(clickLeftIconOnToolbar()),
  };
}

const mapStateToProps = createStructuredSelector({
  presence: makeSelectPresence(),
  currentUser: makeSelectCurrentUser(),
  mostRecentOnlineContacts: makeSelectMostRecentOnlineContacts(),
  isOpenRightDrawer: makeSelectIsOpenRightDrawer(),
  isOpenLeftDrawer: makeSelectIsOpenLeftDrawer(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = {
  mainContent: {
    base: {
      transition: 'padding-right 500ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
    open: {
      paddingRight: 200,
    },
  },
};
