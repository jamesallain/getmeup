/*
 * main actions
 */
import {
  SYNC_PRESENCE_STATE,
  UPDATE_PRESENCE_DIFF,
  UPDATE_CURRENT_USER,
} from './constants';

/**
 * Sync Presence state
 */
export function syncPresenceState(initialPresence) {
  return {
    type: SYNC_PRESENCE_STATE,
    initialPresence,
  };
}

/**
 * Update presence diff
 */
export function updatePresenceDiff(diff) {
  return {
    type: UPDATE_PRESENCE_DIFF,
    diff,
  };
}

/**
 * Update current user
 */
export function updateCurrentUser(user) {
  return {
    type: UPDATE_CURRENT_USER,
    user,
  };
}
