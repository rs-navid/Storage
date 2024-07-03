import axios from "axios";

export const getMainObjects = (query) => {
  return async () => {
    const results = await axios.post(`/object/getallmain`, {...query, ordertype: query.order === "asc" ? false : true});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getMainObject = (id) => {
  return async () => {
    const results = await axios.post(`/object/getmainbyid`, {id});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const deleteMainObjects = (ids) => {
  return async () => {
    const results = await axios.post(`/object/deletemainbyid`, { ids });
    if (results) {
      return true;
    }

    return false;
  };
};

export const createMainObject = (object) => {
  return async () => {
    const result = await axios.post("/object/createmain", {
      ...object,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updateMainObject = (object) => {
  return async () => {
    const result = await axios.post(`/object/updatemain`, {
      ...object,
    });
    if (!result) {
      return false;
    }
    return true;
  };
};

export const getSubObjects = (query) => {
  return async () => {
    const results = await axios.post(`/object/getallsub`, {...query, ordertype: query.order === "asc" ? false : true});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getSubObject = (id) => {
  return async () => {
    const results = await axios.post(`/object/getsubbyid`, {id});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const deleteSubObjects = (ids) => {
  return async () => {
    const results = await axios.post(`/object/deletesubbyid`, { ids });
    if (results) {
      return true;
    }

    return false;
  };
};

export const createSubObject = (object) => {
  return async () => {
    const result = await axios.post("/object/createsub", {
      ...object,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updateSubObject = (object) => {
  return async () => {
    const result = await axios.post(`/object/updatesub`, {
      ...object,
    });
    if (!result) {
      return false;
    }
    return true;
  };
};