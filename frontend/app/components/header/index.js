/*
 * Header
 */

import React from 'react';
import Avatar from 'material-ui/Avatar';
import {
  Toolbar,
  ToolbarGroup,
} from 'material-ui/Toolbar';

//import messages from './messages';
import assets from '../../constants/assets';

export default class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: React.PropTypes.object,
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <img
              alt="Logo"
              src={assets.logo}
              style={styles.logo}
            />
          </ToolbarGroup>
          <ToolbarGroup>
            <Avatar
              src="images/uxceo-128.jpg"
              size={30}
            />
            <span style={styles.name}>{currentUser && currentUser.get('name')}</span>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

const styles = {
  logo: {
    width: 40,
    height: 40,
  },
  name: {
    paddingLeft: 7,
  },
};
