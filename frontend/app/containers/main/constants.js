/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
export const NUMBER_OF_ONLINE_CONTACTS_ON_RIGHT_DRAWER = 20;
export const SYNC_PRESENCE_STATE = 'getmeup/main/SYNC_PRESENCE_STATE';
export const UPDATE_PRESENCE_DIFF = 'getmeup/main/UPDATE_PRESENCE_DIFF';
export const UPDATE_CURRENT_USER = 'getmeup/main/UPDATE_CURRENT_USER';
export const CLICK_RIGHT_ICON_ON_TOOLBAR = 'getmeup/main/CLICK_RIGHT_ICON_ON_TOOLBAR';
