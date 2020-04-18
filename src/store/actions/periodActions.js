import axios from "axios";

export const getPeriods = () => {
  return async () => {
    const results = await axios.get("/period/periods");
    if (results) {
      return results.data;
    }
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

export const createPeriod = (period) => {
  return async () => {
    const result = await axios.post("/period", {
      name: period.name,
      key: period.key,
      start: period.start,
      end: period.end,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updatePeriod = (period) => {
  return async () => {
    const result = await axios.put(`/period/${period.id}`, {
      name: period.name,
      key: period.key,
      start: period.start,
      end: period.end,
    });
    if (!result) {
      return false;
    }
    return true;
  };
};
