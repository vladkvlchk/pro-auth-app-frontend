import { observer } from "mobx-react-lite";
import React from "react";
import { Context } from ".";
import LoginForm from "./components/LoginForm";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";

function App() {
  const { store } = React.useContext(Context);
  const [users, setUsers] = React.useState<IUser[]>([]);
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return <div>loading...</div>;
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <div className="App">
      <h1>
        {store.isAuth
          ? `User authorized (${store.user.email})`
          : "User does not authorized"}
      </h1>
      <h1>{store.user.isActivated ? 'email confirmed' : 'confirm your email !!!'}</h1>
      <button onClick={() => store.logout()}>log out</button>
      <div>
        <button onClick={getUsers}>get all users</button>
      </div>
      {users.map(user => <div key={user.email}>{user.email}</div>)}
    </div>
  );
}

export default observer(App);
