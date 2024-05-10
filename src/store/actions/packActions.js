import axios from "axios";

export const getPacks = (query) => {
  return async () => {
    const results = await axios.post(`/packing/getall`, {...query, ordertype: query.order === "asc" ? false : true});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getFirstExam = () => {
  return async () => {
    const results = await axios.get(`/exam/first`);
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getPack = (id) => {
  return async () => {
    const results = await axios.post(`/packing/getbyid`, {id});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const deletePacks = (ids) => {
  return async () => {
    const results = await axios.post(`/packing/deletebyid`, { ids });
    if (results) {
      return true;
    }

    return false;
  };
};

export const createPack = (pack) => {
  return async () => {
    const result = await axios.post("/packing/create", {
      ...pack,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updatePack = (pack) => {
  return async () => {
    const result = await axios.post(`/packing/update`, {
      ...pack,
    });
    if (!result) {
      return false;
    }
    return true;
  };
};
