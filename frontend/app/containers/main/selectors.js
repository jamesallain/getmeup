/**
 * The main state selectors
 */

import { createSelector } from 'reselect';

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  return (state) => {
    const routingState = state.route;
    if (JSON.stringify(routingState) !== JSON.stringify(prevRoutingState)) {
      prevRoutingState = routingState;
    }
    return prevRoutingState;
  };
};

const selectMain = (state) => state.global;

const makeSelectPresence = () => createSelector(
  selectMain,
  (mainState) => mainState.presence
);

const makeSelectCurrentUser = () => createSelector(
  selectMain,
  (mainState) => mainState.currentUser
);

const makeSelectMostRecentOnlineContacts = () => createSelector(
  selectMain,
  (mainState) => mainState.mostRecentOnlineContacts
);

const makeSelectIsOpenRightDrawer = () => createSelector(
  selectMain,
  (mainState) => mainState.isOpenRightDrawer
);

export {
  makeSelectLocationState,
  selectMain,
  makeSelectPresence,
  makeSelectCurrentUser,
  makeSelectMostRecentOnlineContacts,
  makeSelectIsOpenRightDrawer,
};
