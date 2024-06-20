import { gql } from "@apollo/client";

export const GQL_GET_USERS = gql`
  query {
    users {
      name
      id
      email
      name
      _count {
        posts
      }
      posts {
        content
        title
        published
        authorId
      }
    }
  }
`;

export const GQL_UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $email: String!, $name: String!) {
    updateUser(userUpdateInput: { id: $id, email: $email, name: $name }) {
      email
      name
    }
  }
`;
