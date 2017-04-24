/**
 * Socket util
 */

import { Socket } from 'phoenix';
import { getToken } from './auth';

export function connectSocket(props) {
  const socket = new Socket('ws://localhost:9191/socket', {
    params: { token: getToken() },
  });
  socket.connect();
  socket.conn.onerror = () => {
    console.log('Cannot connect to server');
    // TODO: dispatch action to global error handling
    // Because no way to get response content of socket from browser, we're assuming the error is unauthorization and navigate user to login page
    // also, should clear token from localstorage
  };

  const channel = socket.channel('users:online', {});
  channel.join()
    .receive('ok', (resp) => {
      console.log('Joined successfully', resp);
    })
    .receive('error', (resp) => {
      console.log('Unable to join', resp);
    });

  channel.on('user_joined', (user) => {
    props.onUpdateCurrentUser(user);
    channel.on('presence_state', (initialPresence) => props.onSyncPresenceState(initialPresence));
    channel.on('presence_diff', (diff) => props.onUpdatePresenceDiff(diff));
  });
}
