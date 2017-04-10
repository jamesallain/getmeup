/*
 * Login page actions
 */

import {
  CHANGE_FIELD_VALUE,
  SUBMIT_LOGIN_FORM,
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
 * Submit login form
 */
export function submitLoginForm(loginInfo) {
  return {
    type: SUBMIT_LOGIN_FORM,
    loginInfo,
  };
}
