/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import { Presence } from 'phoenix';

import {
  SYNC_PRESENCE_STATE,
  UPDATE_PRESENCE_DIFF,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  fetching: false,
  error: null,
  user: false,
  presence: {},
  connected: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SYNC_PRESENCE_STATE:
      return state
        .set('connected', true)
        .set('presence', fromJS(Presence.syncState(state.get('presence'), action.initialPresence)));

    case UPDATE_PRESENCE_DIFF:
      return state
        .set('presence', fromJS(Presence.syncDiff(state.get('presence'), action.diff)));

    default:
      return state;
  }
}

export default appReducer;
