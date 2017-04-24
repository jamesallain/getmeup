/**
 * The main state selectors
 */

import { createSelector } from 'reselect';

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const selectMain = (state) => state.get('global');

const makeSelectPresence = () => createSelector(
  selectMain,
  (mainState) => mainState.get('presence')
);

const makeSelectCurrentUser = () => createSelector(
  selectMain,
  (mainState) => mainState.get('currentUser')
);

const makeSelectMostRecentOnlineContacts = () => createSelector(
  selectMain,
  (mainState) => mainState.get('mostRecentOnlineContacts')
);

export {
  makeSelectLocationState,
  selectMain,
  makeSelectPresence,
  makeSelectCurrentUser,
  makeSelectMostRecentOnlineContacts,
};
