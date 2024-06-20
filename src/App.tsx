import "./App.css";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./gql/user";
import { user } from "./types/user";

const TodoPrivateListQuery = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) {
    return false;
  }
  if (error) {
    console.error(error);
    return false;
  }
  const users: user[] = data.users;
  return users;
};

function App() {
  const users: user[] = TodoPrivateListQuery() || [];

  return (
    <div>
      <h2>ユーザー一覧</h2>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <p>id:{user.id}</p>
            <p>name:{user.name}</p>
            <p>email:{user.email}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default App;
