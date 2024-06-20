import "./App.css";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./gql/user";
import { user } from "./types/user";

const TodoPrivateListQuery = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }
  //   if (error) {
  //     console.error(error);
  //     return <div>Error!</div>;
  //   }
  const users: user[] = data?.users;
  return users;
};

function App() {
  const users = TodoPrivateListQuery();
  console.log(users && users[0].name);
  //   if (users !== undefined) {
  //     console.log(users[0]);
  //   }

  return <div>hello world</div>;
}

export default App;
