import axios from "axios";

export const getPeriods = () => {
  return async () => {
    const results = await axios.get("/period/periods");
    return results.data;
  };
};
