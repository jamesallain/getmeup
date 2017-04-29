/*
 * User Profile
 */

import React from 'react';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

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
        <section style={styles.userInfo}>
          <Avatar
            src={avatar}
            size={100}
            style={styles.avatar}
          />
          <p>{name}</p>
          <div>
            <FontIcon
              className="material-icons"
            >
              video_call
            </FontIcon>
          </div>
        </section>
      </div>
    );
  }
}

const styles = {
  userInfo: {
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
};
