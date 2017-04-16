/*
 * Login page actions
 */

import { browserHistory } from 'react-router';
import { authenticateUser } from '../../utils/auth';
import routePaths from '../../route-paths';
import {
  CHANGE_FIELD_VALUE,
  LOGIN_SUCCESS,
} from './constants';

/**
 * Change field value
 */
export function changeFieldValue(event) {
  return {
    type: CHANGE_FIELD_VALUE,
    fieldName: event.target.name,
    fieldValue: event.target.value,
  };
}

/**
 * Login success
 */
export function loginSuccess(user) {
  authenticateUser(user.token);
  browserHistory.push(routePaths.getHomePath());
  return {
    type: LOGIN_SUCCESS,
  };
}
