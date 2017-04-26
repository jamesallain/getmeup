/*
 * Contacts right drawer
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import folders from '../../constants/folders';
import assets from '../../constants/assets';

export default class MenuLeftDrawer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    user: React.PropTypes.object,
    isOpenLeftDrawer: React.PropTypes.object,
  }

  render() {
    const {
      user,
      isOpenLeftDrawer,
    } = this.props;
    const username = user ? user.name : '';
    const avatar = user ? `/${folders.assets}/${user.avatar}` : assets.defaultAvatar;

    return (
      <div>
        <Drawer
          openSecondary={false}
          open={isOpenLeftDrawer}
          containerStyle={styles.drawerContainer}
        >
          <List>
            <ListItem
              primaryText={username}
              leftIcon={<Avatar src={avatar} />}
            />
            <ListItem
              primaryText="Testing"
              leftIcon={
                <FontIcon
                  className="material-icons"
                >
                  phone_bluetooth_speaker
                </FontIcon>
              }
            />
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
};
