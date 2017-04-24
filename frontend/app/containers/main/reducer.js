/*
 * MainReducer
 */

import { fromJS } from 'immutable';
import { Presence } from 'phoenix';

import {
  SYNC_PRESENCE_STATE,
  UPDATE_PRESENCE_DIFF,
  UPDATE_CURRENT_USER,
  NUMBER_OF_ONLINE_CONTACTS_ON_RIGHT_DRAWER,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  fetching: false,
  error: null,
  presence: {},
  currentUser: null,
  mostRecentOnlineContacts: [],
});

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString();
}

function listBy(userId, { metas }) {
  return {
    id: userId,
    onlineAtTimestamp: metas[0].online_at,
    onlineAt: formatTimestamp(metas[0].online_at),
    name: metas[0].name,
    avatar: metas[0].avatar,
  };
}

function getMostRecentOnlineContacts(presences) {
  return Presence.list(presences, listBy)
    .sort((a, b) => b - a)
    .slice(0, NUMBER_OF_ONLINE_CONTACTS_ON_RIGHT_DRAWER);
}

function updateMostRecentOnlineContacts(presences, diff, currentUser, oldMostRecentOnlineContacts) {
  const joins = diff.joins;
  const joinIds = Object.keys(diff.joins);
  const leaveIds = Object.keys(diff.leaves);
  if (joinIds.length) {
    const joinUsers = joinIds.reduce((acc, userId) => {
      if (currentUser.id === userId) {
        return acc;
      }
      return acc.concat({
        id: userId,
        onlineAtTimestamp: joins[userId].metas[0].online_at,
        onlineAt: formatTimestamp(joins[userId].metas[0].online_at),
        name: joins[userId].metas[0].name,
        avatar: joins[userId].metas[0].avatar,
      });
    }, []);
    return joinUsers.length ?
      oldMostRecentOnlineContacts :
      joinUsers
        .concat(oldMostRecentOnlineContacts)
        .slice(0, NUMBER_OF_ONLINE_CONTACTS_ON_RIGHT_DRAWER);
  }

  if (leaveIds.length) {
    const isIntersected = oldMostRecentOnlineContacts.find((item) => leaveIds.indexOf(item.id) > -1);
    return !isIntersected ?
      oldMostRecentOnlineContacts :
      getMostRecentOnlineContacts(presences);
  }

  return oldMostRecentOnlineContacts;
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SYNC_PRESENCE_STATE: // eslint-disable-line
      const syncStatePresences = Presence.syncState(state.get('presence'), action.initialPresence);
      return state
        .set('presence', fromJS(syncStatePresences))
        .set('mostRecentOnlineContacts', fromJS(getMostRecentOnlineContacts(syncStatePresences)));

    case UPDATE_PRESENCE_DIFF: // eslint-disable-line
      const syncDiffPresences = Presence.syncDiff(state.get('presence'), action.diff);
      return state
        .set('presence', fromJS(syncDiffPresences))
        .set('mostRecentOnlineContacts', fromJS(updateMostRecentOnlineContacts(syncDiffPresences, action.diff, state.get('currentUser'), state.get('mostRecentOnlineContacts'))));

    case UPDATE_CURRENT_USER:
      return state
        .set('currentUser', fromJS(action.user));

    default:
      return state;
  }
}

export default appReducer;
