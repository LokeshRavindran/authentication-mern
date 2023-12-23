import { errorToast } from "./toastHelper";

export const generateJSONHeaders = () => {
  const headers = {};
  const token = localStorage.getItem("token");
  headers["Content-type"] = "application/json";
  headers["Authorization"] = `Bearer ${token || ""}`;
  return headers;
};

export const errorHandler = (error) => {
  if (error?.response?.data?.error?.name === "TokenExpiredError") {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    errorToast("Session Expired. Please re-login");
    return;
  }
  throw new Error(error?.response?.data?.message || error?.message);
};
