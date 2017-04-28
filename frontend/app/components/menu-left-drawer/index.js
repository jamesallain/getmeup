/*
 * Contacts right drawer
 */

import React from 'react';
import Radium from 'radium';
import { FormattedMessage } from 'react-intl';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import folders from '../../constants/folders';
import assets from '../../constants/assets';

@Radium
export default class MenuLeftDrawer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    user: React.PropTypes.object,
    isOpenLeftDrawer: React.PropTypes.object,
  }

  render() {

    console.log('---------- render left drawer');

    const {
      user,
      isOpenLeftDrawer,
    } = this.props;
    const username = user ? user.name : '';
    const avatar = user ? `/${folders.assets}/${user.avatar}` : assets.defaultAvatar;

    return (
      <div style={styles.container}>
        <Drawer
          openSecondary={false}
          open={isOpenLeftDrawer}
          containerStyle={styles.drawerContainer}
          style={styles.drawer}
        >
          <List>
            <ListItem
              primaryText={username}
              leftIcon={<Avatar src={avatar} />}
              innerDivStyle={styles.listItem}
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
  container: {
    width: 200,
    top: 56,
    height: 300,
    background: 'yellow',
    '@media (min-width: 782px)': {
      width: 300,
    },

    '@media (min-width: 1000px)': {
      width: 400,
    },
  },
  drawer: {
    height: '100%',
  },
  drawerContainer: {
    position: 'relative',
    width: '100%',
  },
  listItem: {
    fontSize: 30,
    '@media (min-width: 782px)': {
      fontSize: 35,
    },
  },

};
