import { gql } from "@apollo/client";

export const GET_USERS = gql`
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
