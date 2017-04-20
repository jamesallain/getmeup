/**
 * Login page reducer
 */

import { fromJS } from 'immutable';

import {
  CHANGE_FIELD_VALUE,
  LOGIN_SUCCESS,
} from './constants';

// The initial state of event detail page
const initialState = fromJS({
  loading: false,
  loginInfo: {
    email: false,
    password: false,
  },
  errors: {
    email: false,
    password: false,
    backendError: false,
  },
});


function loginReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FIELD_VALUE:
      return state
        .setIn(['loginInfo', action.fieldName], action.fieldValue);

    case LOGIN_SUCCESS:
      return state
        .set('loading', true);

    default:
      return state;
  }
}

export default loginReducer;

