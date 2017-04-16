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

import {
  // FETCHING_REQUEST,
  // HANDLE_ERRORS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  fetching: false,
  error: null,
  user: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    // case FETCHING_REQUEST:
    //   return state
    //     .set('fetching', action.fetching);
    // case HANDLE_ERRORS:
    //   return state
    //     .set('error', action.error);

    default:
      return state;
  }
}

export default appReducer;
