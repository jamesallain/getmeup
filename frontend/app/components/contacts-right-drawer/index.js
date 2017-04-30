/*
 * Contacts right drawer
 */

import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import messages from './messages';
import folders from '../../constants/folders';
import routePaths from '../../route-paths';

export default class ContactsRightDrawer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    mostRecentOnlineContacts: React.PropTypes.array,
    isOpenRightDrawer: React.PropTypes.bool,
  }

  render() {
    const {
      mostRecentOnlineContacts,
      isOpenRightDrawer,
    } = this.props;

    return (
      <div>
        <Drawer
          openSecondary
          open={isOpenRightDrawer}
          containerStyle={styles.drawerContainer}
        >
          <List>
            <Subheader>
              <FormattedMessage {...messages.onlineLabel} />
            </Subheader>
            {mostRecentOnlineContacts.map((user) =>
              <Link
                key={user.id}
                to={routePaths.getUserDetailPathWithParams(user.id)}
                style={styles.contactLink}
              >
                <ListItem
                  primaryText={user.name}
                  leftAvatar={<Avatar src={`/${folders.assets}/${user.avatar}`} />}
                />
              </Link>
            )}
          </List>
        </Drawer>
      </div>
    );
  }
}

const styles = {
  drawerContainer: {
    width: 200,
    top: 56,
  },
  contactLink: {
    textDecoration: 'none',
  },
};
