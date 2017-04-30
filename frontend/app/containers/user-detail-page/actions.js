/*
 * User detail page actions
 */

import {
  STARTING_VIDEO_CALL,
  GET_USER_MEDIA_SUCCESS,
} from './constants';

import { getLocalMedia } from '../../utils/webrtc';

/**
 * Starting call video
 */
export function startingVideoCall(props) {
  getLocalMedia(props);
  return {
    type: STARTING_VIDEO_CALL,
  };
}

/**
 * Get user media success
 */
export function getUserMediaSuccess(localMediaStream) {
  return {
    type: GET_USER_MEDIA_SUCCESS,
    localMediaStream,
  };
}
