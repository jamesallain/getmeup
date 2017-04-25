// app/graphql-client.js


import ApolloClient, {
  createNetworkInterface,
} from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:9191/api',
    // opts: {
    //   credentials: 'same-origin',
    // },
    transportBatching: true,
  }),
  reduxRootSelector: (state) => state.apollo,
});

export default client;
