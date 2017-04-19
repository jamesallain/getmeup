/*
 * main actions
 */
import {
  SYNC_PRESENCE_STATE,
  UPDATE_PRESENCE_DIFF,
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
 * Login success
 */
export function updatePresenceDiff(diff) {
  return {
    type: UPDATE_PRESENCE_DIFF,
    diff,
  };
}
