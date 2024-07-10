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

export const getObjects = (id) => {
  return async () => {
    const results = await axios.post(`/inputreceipt/GetAllObjectsById`, {id});
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

export const getObject = (id) => {
  return async () => {
    const results = await axios.post(`/inputreceipt/GetObjectById`, {id});
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

export const deleteObjects = (ids) => {
  return async () => {
    const results = await axios.post(`/inputreceipt/DeleteObjectsByIds`, { ids });
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

export const createObject = (obj) => {
  return async () => {
    const result = await axios.post("/inputreceipt/CreateObject", {
      ...obj,
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

export const updateObject = (obj) => {
  return async () => {
    const result = await axios.post(`/inputreceipt/UpdateObject`, {
      ...obj,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};