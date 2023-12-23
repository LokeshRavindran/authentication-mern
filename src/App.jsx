import React from "react";
import { useLocation } from "react-router-dom";
import Routes from "./routes";
import Header from "./components/Header/Header";
import { EXCLUDE_HEADER } from "./constants/constants";
import "./App.css";

function App() {
  const { pathname } = useLocation();

  const hideHeader = () => {
    return EXCLUDE_HEADER.includes(pathname);
  };

  return (
    <>
      {!hideHeader() && <Header />}
      <Routes />
    </>
  );
}

export default App;
