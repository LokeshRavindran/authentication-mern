import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <HashRouter basename={"/authentication-mern"}>
        <App />
        <ToastContainer />
      </HashRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
