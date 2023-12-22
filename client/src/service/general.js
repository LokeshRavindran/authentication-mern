import axios from "./axios";
import { generateJSONHeaders, errorHandler } from "../helper/serviceHelper";

export const getHomepageSections = async () => {
  try {
    const response = await axios.get("homepage", {
      headers: generateJSONHeaders(),
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    errorHandler(error);
  }
};

export const getProfileInformation = async (payload) => {
  try {
    const response = await axios.post("profile", payload, {
      headers: generateJSONHeaders(),
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    errorHandler(error);
  }
};

export const updateLikeStatus = async (payload) => {
  try {
    const response = await axios.post("updateLikeStatus", payload, {
      headers: generateJSONHeaders(),
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    errorHandler(error);
  }
};
