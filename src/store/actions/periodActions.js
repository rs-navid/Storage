import axios from "axios";

export const getPeriods = () => {
  return async () => {
    const results = await axios.get("/period/periods");
    return results.data;
  };
};

export const deletePeriods = (ids) => {
  return async () => {
    const result = await axios.post("/period/delete", { ids: ids });
    if (!result) {
      return false;
    }
    return true;
  };
};
