/*
 * Home page
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FontIcon from 'material-ui/FontIcon';

import {
  makeSelectCurrentUser,
} from '../main/selectors';

import UserProfileWithData from './graphql/queries';
import {
  startingVideoCall,
  getUserMediaSuccess,
} from './actions';

import { makeSelectLocalMediaStream } from './selectors';

export class UserDetailPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    params: React.PropTypes.object,
    localMediaStream: React.PropTypes.string,
    onStartingVideoCall: React.PropTypes.func,
  }

  constructor(props, context) {
    super(props, context);
    this.callVideo = this.callVideo.bind(this);
  }

  componentDidMount() {
  }

  callVideo() {
    this.props.onStartingVideoCall(this.props);
  }

  render() {
    const { userId } = this.props.params;
    const { localMediaStream } = this.props;

    return (
      <div>
        <section style={styles.userInfo}>
          <UserProfileWithData
            userId={userId}
          />
          <button
            style={styles.actionBtn}
            onClick={this.callVideo}
          >
            <FontIcon
              className="material-icons"
            >
              video_call
            </FontIcon>
          </button>
        </section>
        <section>
          <video
            autoPlay
            src={localMediaStream}
            style={styles.video.local}
          >
          </video>
        </section>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onStartingVideoCall: (props) => dispatch(startingVideoCall(props)),
    onGetUserMediaSuccess: (localMediaStream) => dispatch(getUserMediaSuccess(localMediaStream)),
  };
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  localMediaStream: makeSelectLocalMediaStream(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(UserDetailPage);

const styles = {
  userInfo: {
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  actionBtn: {
    cursor: 'pointer',
    borderRadius: '50%',
    border: 'solid 1px',
    width: 40,
    height: 40,
  },
  video: {
    local: {
      width: 320,
      maxWidth: '100%',
      // height: 50,
      // filter: 'blur(4px) invert(1) opacity(0.5)',
    },
  },
};
