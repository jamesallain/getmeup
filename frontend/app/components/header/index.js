/*
 * Header
 */

import React from 'react';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import {
  Toolbar,
  ToolbarGroup,
} from 'material-ui/Toolbar';

import assets from '../../constants/assets';
import folders from '../../constants/folders';
// import messages from './messages';

export default class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: React.PropTypes.object,
    onClickRightIcon: React.PropTypes.func,
  }

  constructor(props, context) {
    super(props, context);
    this.clickRightIcon = this.clickRightIcon.bind(this);
  }

  clickRightIcon() {
    this.props.onClickRightIcon();
  }

  render() {
    const { currentUser } = this.props;
    const avatarUrl = currentUser ? `/${folders.assets}/${currentUser.avatar}` : assets.defaultAvatar;
    const username = currentUser ? currentUser.name : '';
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
              src={avatarUrl}
              size={30}
            />
            <span style={styles.name}>{username}</span>
            <FontIcon
              className="material-icons"
              onClick={this.clickRightIcon}
            >
              menu
            </FontIcon>
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
