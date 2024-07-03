import axios from "axios";

export const getReceipts = (query) => {
  return async () => {
    const results = await axios.post(`/inputreceipt/getall`, {...query, ordertype: query.order === "asc" ? false : true});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getReceipt = (id) => {
  return async () => {
    const results = await axios.post(`/inputreceipt/getbyid`, {id});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const deleteReceipts = (ids) => {
  return async () => {
    const results = await axios.post(`/inputreceipt/deletebyid`, { ids });
    if (results) {
      return true;
    }

    return false;
  };
};

export const createReceipt = (storage) => {
  return async () => {
    const result = await axios.post("/inputreceipt/create", {
      ...storage,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updateReceipt = (storage) => {
  return async () => {
    const result = await axios.post(`/inputreceipt/update`, {
      ...storage,
    });
    if (!result) {
      return false;
    }
    return true;
  };
};