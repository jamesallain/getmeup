/*
 * User Profile
 */

import React from 'react';
import Avatar from 'material-ui/Avatar';

import assets from '../../constants/assets';
import folders from '../../constants/folders';
// import messages from './messages';

export default class UserProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    user: React.PropTypes.object,
  }

  render() {
    const { user } = this.props;
    const avatar = user ? `/${folders.assets}/${user.avatar}` : assets.defaultAvatar;
    const name = user ? user.name : '';
    return (
      <div>
        <Avatar
          src={avatar}
          size={100}
        />
        <p>{name}</p>
      </div>
    );
  }
}
