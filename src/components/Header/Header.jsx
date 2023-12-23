import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ProfileOptions from "./ProfileOptions";

const Header = () => {
  const authContext = useContext(AuthContext);

  return (
    <header className="flex items-center justify-between p-8 bg-violet-400">
      <Link to={"/"}>
        <img src={"./images/logo.png"} alt="logo" className="h-10 w-10" />
      </Link>
      {authContext.isLoggedIn ? (
        <ProfileOptions />
      ) : (
        <div>
          <Link to={"/login"}>Login</Link>
          <span> / </span>
          <Link to={"/signup"}>Signup</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
