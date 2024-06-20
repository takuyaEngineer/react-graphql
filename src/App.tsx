import { useEffect, useState } from "react";
import "./App.css";
import { GQL_GET_USERS, GQL_UPDATE_USER } from "./gql/user";
import { user } from "./types/user";
import { useMutation, useQuery } from "@apollo/client";

type inputUser = {
  id?: number;
  email?: string;
  name?: string;
};

function App() {
  const resGetUser = useQuery(GQL_GET_USERS);
  const [userList, setUserList] = useState<user[]>([]);

  const resUpdateUser = useMutation(GQL_UPDATE_USER);

  const [inputUser, setInputUser] = useState<inputUser>({
    id: 0,
    email: "",
    name: "",
  });

  useEffect(() => {
    setUserList(() => resGetUser.data?.users);
  }, [resGetUser.data]);

  const updateUser = () => {
    resUpdateUser[0]({
      variables: {
        id: inputUser?.id,
        email: inputUser?.email,
        name: inputUser?.name,
      },
    })
      .then(() => {
        setInputUser(() => {
          return {
            id: 0,
            email: "",
            name: "",
          };
        });
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <h2>ユーザー一覧</h2>
        {userList?.map((user) => {
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
      <div>
        <h2>ユーザー更新</h2>
        ID:
        <input
          type="number"
          value={inputUser?.id}
          onChange={(e) =>
            setInputUser({ ...inputUser, id: Number(e.target.value) })
          }
        />
        email:
        <input
          type="email"
          value={inputUser?.email}
          onChange={(e) =>
            setInputUser({ ...inputUser, email: e.target.value })
          }
        />
        name:
        <input
          type="text"
          value={inputUser?.name}
          onChange={(e) => setInputUser({ ...inputUser, name: e.target.value })}
        />
        <button
          onClick={() => {
            updateUser();
          }}
        >
          更新
        </button>
      </div>
    </div>
  );
}

export default App;
