import axios from "axios";

export const getPeriods = () => {
  return async () => {
    const results = await axios.post("/period/getall", {});
    if (results) {
      return results.data;
    }
  };
};

export const deletePeriods = (ids) => {
  return async () => {
    const result = await axios.post("/period/deletebyid", { ids: ids });
    if (!result) {
      return false;
    }
    return true;
  };
};

export const createPeriod = (period) => {
  return async () => {
    const result = await axios.post("/period/create", {
      name: period.name,
      code: period.code,
      startDateStr: period.start,
      endDateStr: period.end,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updatePeriod = (period) => {
  return async () => {
    const result = await axios.post(`/period/update`, {
      id: period.id,  
      name: period.name,
      code: period.code,
      startDateStr: period.start,
      endDateStr: period.end,
    });
    if (!result) {
      return false;
    }
    return true;
  };
};
