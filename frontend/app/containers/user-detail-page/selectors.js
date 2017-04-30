/**
 * The login state selectors
 */

import { createSelector } from 'reselect';

const selectUserDetail = (state) => state.userDetail;

const makeSelectLocalMediaStream = () => createSelector(
  selectUserDetail,
  (userDetailState) => userDetailState.localMediaStream
);

export {
  selectUserDetail,
  makeSelectLocalMediaStream,
};
