/**
 * The login state selectors
 */

import { createSelector } from 'reselect';

const selectLogin = (state) => state.login;

const makeSelectLoginInfo = () => createSelector(
  selectLogin,
  (loginState) => loginState.loginInfo
);

export {
  selectLogin,
  makeSelectLoginInfo,
};
