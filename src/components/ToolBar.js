import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ToolBar = () => {
  const [me, setMe] = useContext(AuthContext);
  const logoutHandler = async () => {
    try {
      await axios.patch(
        "/users/logout",
        {},
        { headers: { sessionid: me.sessionId } }
      );
      setMe();
      alert("Logout!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  return (
    <>
      <Link to="/">
        <span>Home</span>
      </Link>
      {me ? (
        <span
          onClick={logoutHandler}
          style={{ float: "right", cursor: "pointer" }}
        >
          Logout({me.name})
        </span>
      ) : (
        <>
          <Link to="/auth/login">
            <span style={{ float: "right" }}>Login</span>
          </Link>
          <Link to="/auth/register">
            <span style={{ float: "right", marginRight: 15 }}>Register</span>
          </Link>
        </>
      )}
    </>
  );
};

export default ToolBar;
