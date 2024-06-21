import { gql } from "@apollo/client";
/**
 * 全ユーザー取得のクエリ
 */
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
/**
 * ユーザー作成のミューテーション
 */
export const GQL_CREATE_USER = gql`
  mutation CreateUser($email: String!, $name: String!) {
    createUser(userCreateInput: { email: $email, name: $name }) {
      email
      name
    }
  }
`;
/**
 * ユーザー更新のミューテーション
 */
export const GQL_UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $email: String!, $name: String!) {
    updateUser(userUpdateInput: { id: $id, email: $email, name: $name }) {
      email
      name
    }
  }
`;
/**
 * ユーザー削除のミューテーション
 */
export const GQL_DELETE_USER = gql`
  mutation RemoveUser($id: Int!) {
    removeUser(id: $id) {
      email
      name
    }
  }
`;
