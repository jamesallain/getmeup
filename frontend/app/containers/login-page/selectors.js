/**
 * The login state selectors
 */

import { createSelector } from 'reselect';

const selectLogin = (state) => state.get('login');

const makeSelectLoginInfo = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('loginInfo')
);

export {
  selectLogin,
  makeSelectLoginInfo,
};
