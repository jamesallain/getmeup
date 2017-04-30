/**
 * Login page reducer
 */

import {
  GET_USER_MEDIA_SUCCESS,
} from './constants';

// The initial state of event detail page
const initialState = {
  loading: false,
  localMediaStream: null,
};

function userDetailReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_MEDIA_SUCCESS:
      return { ...state, localMediaStream: action.localMediaStream };
    default:
      return state;
  }
}

export default userDetailReducer;
