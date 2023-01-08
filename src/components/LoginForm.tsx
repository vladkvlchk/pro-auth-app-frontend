import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Context } from "../index";

const LoginForm: FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const { store } = React.useContext(Context);

  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="password"
      />
      <button onClick={() => store.login(email, password)}>login</button>
      <button onClick={() => store.registration(email, password)}>
        sign up
      </button>
    </div>
  );
};

export default observer(LoginForm);
