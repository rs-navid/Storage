import axios from "axios";

export const getClients = (query) => {
  return async () => {
    const results = await axios.post(`/client/getall`, {...query, ordertype: query.order === "asc" ? false : true});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getClient = (id) => {
  return async () => {
    const results = await axios.post(`/client/getbyid`, {id});
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const deleteClients = (ids) => {
  return async () => {
    const results = await axios.post(`/client/deletebyid`, { ids: ids } );
    if (results) {
      return true;
    }

    return false;
  };
};

export const createClient = (client) => {
  return async () => {
    const result = await axios.post("/client/create", {
      ...client,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updateClient = (client) => {
  return async () => {
    const result = await axios.post(`/client/update`, {
      ...client,
    });
    if (!result) {
      return false;
    }
    return true;
  };
};
