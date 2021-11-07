import axios from "axios";
import React, { useContext, useState } from "react";
import CustomInput from "../components/CustomInput";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [, setMe] = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (username.length < 3) throw new Error("Username은 3자 이상입니다.");
      if (password.length < 6) throw new Error("Password는 6자 이상입니다.");
      if (password !== passwordCheck)
        throw new Error("Password가 일치하지 않습니다.");
      const result = await axios.post("/users/register", {
        name,
        username,
        password,
      });
      setMe({
        userId: result.data.userId,
        sessionId: result.data.sessionId,
        name: result.data.name,
      });
      history.push("/");

      console.log({ result });
      alert("회원가입 성공!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  return (
    <div
      style={{
        marginTop: 100,
        maxWidth: 350,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h3>Register</h3>
      <form onSubmit={submitHandler}>
        <CustomInput label="Name" value={name} setValue={setName} />
        <CustomInput label="Username" value={username} setValue={setUsername} />
        <CustomInput
          label="Password"
          value={password}
          setValue={setPassword}
          type="password"
        />
        <CustomInput
          label="Password Check"
          value={passwordCheck}
          setValue={setPasswordCheck}
          type="password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
export default RegisterPage;
