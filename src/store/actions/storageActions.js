import axios from "axios";

export const getMainStorages = (query) => {
  return async () => {
    const results = await axios.post(`/storage/getallmain`, {...query, ordertype: query.order === "asc" ? false : true});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getMainStorage = (id) => {
  return async () => {
    const results = await axios.post(`/storage/getmainbyid`, {id});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const deleteMainStorages = (ids) => {
  return async () => {
    const results = await axios.post(`/storage/deletemainbyid`, { ids });
    if (results) {
      return true;
    }

    return false;
  };
};

export const createMainStorage = (storage) => {
  return async () => {
    const result = await axios.post("/storage/createmain", {
      ...storage,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updateMainStorage = (storage) => {
  return async () => {
    const result = await axios.post(`/storage/updatemain`, {
      ...storage,
    });
    if (!result) {
      return false;
    }
    return true;
  };
};

export const getSubStorages = (query) => {
  return async () => {
    const results = await axios.post(`/storage/getallsub`, {...query, ordertype: query.order === "asc" ? false : true});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getSubStorage = (id) => {
  return async () => {
    const results = await axios.post(`/storage/getsubbyid`, {id});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const deleteSubStorages = (ids) => {
  return async () => {
    const results = await axios.post(`/storage/deletesubbyid`, { ids });
    if (results) {
      return true;
    }

    return false;
  };
};

export const createSubStorage = (storage) => {
  return async () => {
    const result = await axios.post("/storage/createsub", {
      ...storage,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updateSubStorage = (storage) => {
  return async () => {
    const result = await axios.post(`/storage/updatesub`, {
      ...storage,
    });
    if (!result) {
      return false;
    }
    return true;
  };
};