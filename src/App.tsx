import { useEffect, useState } from "react";
import "./App.css";
import { GQL_CREATE_USER, GQL_GET_USERS, GQL_UPDATE_USER } from "./gql/user";
import { user } from "./types/user";
import { useMutation, useQuery } from "@apollo/client";

type inputUpdateUser = {
  id: number;
  email: string;
  name?: string;
};

type inputCreateUser = {
  email: string;
  name?: string;
};

function App() {
  // ユーザー一覧を取得
  const resGetUser = useQuery(GQL_GET_USERS);
  const [userList, setUserList] = useState<user[]>([]);

  useEffect(() => {
    setUserList(() => resGetUser.data?.users);
  }, [resGetUser.data]);

  const resCreateUser = useMutation(GQL_CREATE_USER);
  const resUpdateUser = useMutation(GQL_UPDATE_USER);

  // ユーザー作成の入力欄データ
  const [inputCreateUser, setInputCreateUser] = useState<inputCreateUser>({
    email: "",
    name: "",
  });
  /**
   * ユーザーを作成する.
   */
  const createUser = () => {
    resCreateUser[0]({
      variables: {
        email: inputCreateUser?.email,
        name: inputCreateUser?.name,
      },
    })
      .then(() => {
        setInputCreateUser(() => {
          return {
            id: 0,
            email: "",
            name: "",
          };
        });
        console.log("success");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ユーザー更新の入力欄データ
  const [inputUpdateUser, setInputUpdateUser] = useState<inputUpdateUser>({
    id: 0,
    email: "",
    name: "",
  });
  /**
   * ユーザーを更新する.
   */
  const updateUser = () => {
    resUpdateUser[0]({
      variables: {
        id: inputUpdateUser?.id,
        email: inputUpdateUser?.email,
        name: inputUpdateUser?.name,
      },
    })
      .then(() => {
        setInputUpdateUser(() => {
          return {
            id: 0,
            email: "",
            name: "",
          };
        });
        console.log("success");
        window.location.reload();
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
        <h2>ユーザー作成</h2>
        email:
        <input
          type="email"
          value={inputCreateUser?.email}
          onChange={(e) =>
            setInputCreateUser({ ...inputCreateUser, email: e.target.value })
          }
        />
        name:
        <input
          type="text"
          value={inputCreateUser?.name}
          onChange={(e) =>
            setInputCreateUser({ ...inputCreateUser, name: e.target.value })
          }
        />
        <button
          onClick={() => {
            createUser();
          }}
        >
          作成
        </button>
      </div>
      <div>
        <h2>ユーザー更新</h2>
        ID:
        <input
          type="number"
          value={inputUpdateUser?.id}
          onChange={(e) =>
            setInputUpdateUser({
              ...inputUpdateUser,
              id: Number(e.target.value),
            })
          }
        />
        email:
        <input
          type="email"
          value={inputUpdateUser?.email}
          onChange={(e) =>
            setInputUpdateUser({ ...inputUpdateUser, email: e.target.value })
          }
        />
        name:
        <input
          type="text"
          value={inputUpdateUser?.name}
          onChange={(e) =>
            setInputUpdateUser({ ...inputUpdateUser, name: e.target.value })
          }
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
