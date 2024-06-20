import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { gql, useQuery } from "@apollo/client";

const res = gql`
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

type post = {
  authorId: number;
  content: string;
  published: boolean;
  title: string;
};

type user = {
  email: string;
  name: string;
  id: number;
  posts: post[];
};

const TodoPrivateListQuery = () => {
  const { loading, error, data } = useQuery(res);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  const users: user[] = data;
  return users;
};

function App() {
  const users = TodoPrivateListQuery();
  console.log(users);

  return <div>hello world</div>;
}

export default App;
