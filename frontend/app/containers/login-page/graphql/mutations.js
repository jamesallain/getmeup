/**
 * Mutations
 */

import { gql, graphql } from 'react-apollo';
import { browserHistory } from 'react-router';
import LoginForm from '../../../components/login-form';
import { authenticateUser } from '../../../utils/auth';
import routePaths from '../../../route-paths';

const loginMutation = gql`
  mutation signIn($email: String!, $password: String!) {
    sign_in(email: $email, password: $password) {
      id
      email
      token
    }
  }
`;

export default graphql(loginMutation, {
  props: ({ mutate }) => ({
    login: (email, password) => mutate({
      variables: { email, password },
    })
    .then(({ data }) => {
      authenticateUser(data.sign_in.token);
      browserHistory.push(routePaths.getHomePath());
    })
    .catch((error) => {
      // TODO: error handling here
    }),
  }),
})(LoginForm);
