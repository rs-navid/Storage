import axios from "axios";

export const getReceipts = (query) => {
  return async () => {
    const results = await axios.post(`/outputreceipt/getall`, {...query, ordertype: query.order === "asc" ? false : true});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getObjects = (id) => {
  return async () => {
    const results = await axios.post(`/outputreceipt/GetAllObjectsById`, {id});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getReceipt = (id) => {
  return async () => {
    const results = await axios.post(`/outputreceipt/getbyid`, {id});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getAddress = (id) => {
  return async () => {
    const results = await axios.post(`/outputreceipt/getaddressbyid`, {id});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getPhoneNumber = (id) => {
  return async () => {
    const results = await axios.post(`/outputreceipt/getphonenumberbyid`, {id});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const deleteReceipts = (ids) => {
  return async () => {
    const results = await axios.post(`/outputreceipt/deletebyid`, { ids });
    if (results) {
      return true;
    }

    return false;
  };
};

export const createReceipt = (storage) => {
  return async () => {
    const result = await axios.post("/outputreceipt/create", {
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
    const result = await axios.post(`/outputreceipt/update`, {
      ...storage,
    });
    if (!result) {
      return false;
    }
    return true;
  };
};

export const updateObject = (obj) => {
  return async () => {
    const result = await axios.post(`/outputreceipt/UpdateObject`, obj);
    if (!result) {
      return false;
    }
    return result;
  };
};