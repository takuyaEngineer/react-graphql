import { useEffect, useState } from "react";
import "./App.css";
import {
  GQL_CREATE_USER,
  GQL_DELETE_USER,
  GQL_GET_USERS,
  GQL_UPDATE_USER,
} from "./gql/user";
import { user } from "./types/user";
import { useMutation, useQuery } from "@apollo/client";

type inputCreateUser = {
  email: string;
  name?: string;
};

type inputUpdateUser = {
  id: number;
  email?: string;
  name?: string;
};

type inputDeleteUser = {
  id: number;
};

function App() {
  const resGetUser = useQuery(GQL_GET_USERS);
  const resCreateUser = useMutation(GQL_CREATE_USER);
  const resUpdateUser = useMutation(GQL_UPDATE_USER);
  const resDeleteUser = useMutation(GQL_DELETE_USER);

  // ユーザー一覧
  const [userList, setUserList] = useState<user[]>([]);
  useEffect(() => {
    setUserList(() => resGetUser.data?.users);
  }, [resGetUser.data]);
  // ユーザー作成の入力値
  const [inputCreateUser, setInputCreateUser] = useState<inputCreateUser>({
    email: "",
    name: "",
  });
  // ユーザー更新の入力値
  const [inputUpdateUser, setInputUpdateUser] = useState<inputUpdateUser>({
    id: 0,
    email: "",
    name: "",
  });
  // ユーザー削除の入力値
  const [inputDeleteUser, setInputDeleteUser] = useState<inputDeleteUser>({
    id: 0,
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
  /**
   * ユーザーを削除する.
   */
  const deleteUser = () => {
    resDeleteUser[0]({
      variables: {
        id: inputDeleteUser?.id,
      },
    })
      .then(() => {
        setInputDeleteUser(() => {
          return {
            id: 0,
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
      <div>
        <h2>ユーザー削除</h2>
        ID:
        <input
          type="number"
          value={inputDeleteUser?.id}
          onChange={(e) =>
            setInputDeleteUser({
              ...inputDeleteUser,
              id: Number(e.target.value),
            })
          }
        />
        <button
          onClick={() => {
            deleteUser();
          }}
        >
          削除
        </button>
      </div>
    </div>
  );
}

export default App;
