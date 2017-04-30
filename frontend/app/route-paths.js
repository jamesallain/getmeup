/*
* Route paths
*/

function getHomePath() {
  return '/';
}

function getLoginPath() {
  return '/login';
}

function getUserDetailPath() {
  return '/users/:userId';
}

function getUserDetailPathWithParams(userId) {
  return `/users/${userId}`;
}

export default {
  getHomePath,
  getLoginPath,
  getUserDetailPath,
  getUserDetailPathWithParams,
};
