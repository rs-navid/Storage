import axios from "axios";

export const getUnits = (query) => {
  return async () => {
    const results = await axios.post(`/unit/getall`, {...query, ordertype: query.order === "asc" ? false : true});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getUnit = (id) => {
  return async () => {
    const results = await axios.post(`/unit/getbyid`, {id});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const deleteUnits = (ids) => {
  return async () => {
    const results = await axios.post(`/unit/deletebyid`, { ids });
    if (results) {
      return true;
    }

    return false;
  };
};

export const createUnit = (unit) => {
  return async () => {
    const result = await axios.post("/unit/create", {
      ...unit,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updateUnit = (unit) => {
  return async () => {
    const result = await axios.post(`/unit/update`, {
      ...unit,
    });
    if (!result) {
      return false;
    }
    return true;
  };
};
