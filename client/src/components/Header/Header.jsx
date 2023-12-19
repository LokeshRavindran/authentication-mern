import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Header = () => {
  const authContext = useContext(AuthContext);

  const logoutHandler = () => {
    authContext.setUser({
      isLoggedIn: false,
      token: "",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <div className="flex items-center justify-between p-8 bg-violet-400">
      <Link to={"/"}>Logo</Link>
      {authContext.isLoggedIn ? (
        <button onClick={logoutHandler}>Logout</button>
      ) : (
        <div>
          <Link to={"/login"}>Login</Link>
          <span> / </span>
          <Link to={"/signup"}>Signup</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
