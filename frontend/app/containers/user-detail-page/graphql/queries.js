/**
 * Queries
 */

import { gql, graphql } from 'react-apollo';
import UserProfile from '../../../components/user-profile';

const userById = gql`
  query UserById($id: ID!) {
    user_by_id(id: $id) {
      id
      email
      name
      avatar
    }
  }
`;

export default graphql(userById, {
  options: (ownProps) => ({ variables: { id: ownProps.userId } }),

  // ownProps are the props that are passed into the `ProfileWithData`
  // when it is used by a parent component
  props: ({ ownProps, data: { loading, user_by_id, refetch } }) => ({
    userLoading: loading,
    user: user_by_id,
    refetchUser: refetch,
  }),
})(UserProfile);
