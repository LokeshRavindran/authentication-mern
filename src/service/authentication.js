import axios from "./axios";
import { errorHandler } from "../helper/serviceHelper";

export const checkUser = async (payload) => {
  try {
    const response = await axios.post("/login", payload);
    return response.data;
  } catch (error) {
    console.log(error);
    errorHandler(error);
  }
};

export const addUser = async (payload) => {
  try {
    const response = await axios.post("/signup", payload);
    return response;
  } catch (error) {
    console.log(error);
    errorHandler(error);
  }
};
