import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  token: "",
  username: "",
  setUser: () => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    token: "",
    username: "",
  });

  useEffect(() => {
    setUser({
      isLoggedIn: localStorage.getItem("isLoggedIn") || false,
      token: localStorage.getItem("token") || "",
      username: localStorage.getItem("username") || "",
    });
  }, []);

  const contextValue = {
    isLoggedIn: user.isLoggedIn,
    token: user.token,
    username: user.username,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
