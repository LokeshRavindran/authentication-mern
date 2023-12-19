import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  token: "",
  user: {},
  setUser: () => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    token: "",
  });

  useEffect(() => {
    setUser({
      isLoggedIn: localStorage.getItem("isLoggedIn"),
      token: localStorage.getItem("token") || "",
    });
  }, []);

  const contextValue = {
    isLoggedIn: user.isLoggedIn,
    token: user.token,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
