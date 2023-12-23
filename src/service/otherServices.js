import axios from "axios";

export const getCountriesList = async () => {
  try {
    const result = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/flag/unicode"
    );
    return result?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
