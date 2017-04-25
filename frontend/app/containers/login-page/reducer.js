/**
 * Login page reducer
 */

import {
  CHANGE_FIELD_VALUE,
  LOGIN_SUCCESS,
} from './constants';

// The initial state of event detail page
const initialState = {
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
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FIELD_VALUE:
      return {
        ...state,
        loginInfo: { ...state.loginInfo, [action.fieldName]: action.fieldValue },
      };

    case LOGIN_SUCCESS:
      return { ...state, loading: true };

    default:
      return state;
  }
}

export default loginReducer;

