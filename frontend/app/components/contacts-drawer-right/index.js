/*
 * Login Form
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import messages from './messages';

export default class ContactsDrawerRight extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {

  }

  render() {
    return (
      <div>
        <Drawer
          width={styles.drawer.width}
          openSecondary
          open
        >
          <List>
            <Subheader>
              <FormattedMessage {...messages.onlineLabel} />
            </Subheader>
            <ListItem
              primaryText="Brendan Lim"
              leftAvatar={<Avatar src="images/ok-128.jpg" />}
            />
            <ListItem
              primaryText="Eric Hoffman"
              leftAvatar={<Avatar src="images/kolage-128.jpg" />}
            />
          </List>
          <Divider />
          <List>
            <Subheader>
              <FormattedMessage {...messages.offlineLabel} />
            </Subheader>
            <ListItem
              primaryText="Chelsea Otakan"
              leftAvatar={<Avatar src="images/chexee-128.jpg" />}
            />
            <ListItem
              primaryText="James Anderson"
              leftAvatar={<Avatar src="images/jsa-128.jpg" />}
            />
          </List>
        </Drawer>
      </div>
    );
  }
}

const styles = {
  drawer: {
    width: 200,
  },
};
