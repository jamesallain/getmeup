/**
 * Mutations
 */

import { gql, graphql } from 'react-apollo';
import LoginForm from '../../../components/login-form';
// import { connectSocket } from '../../../utils/socket';

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
  props: ({ ownProps, mutate }) => ({
    login: (email, password) => mutate({
      variables: { email, password },
    })
    .then(({ data }) => {
      const user = data.sign_in;
      ownProps.onLoginSuccess(user);
      // connectSocket(ownProps);
    })
    .catch(() => {
      // TODO: error handling here
      // console.log({error});
    }),
  }),
})(LoginForm);
