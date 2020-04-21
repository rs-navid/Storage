import axios from "axios";

export const getClients = (query) => {
  return async () => {
    const results = await axios.get(`/client?${query}`);
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getClient = (id) => {
  return async () => {
    const results = await axios.get(`/client/${id}`);
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const deleteClients = (ids) => {
  return async () => {
    const results = await axios.delete(`/client`, { data: { ids: ids } });
    if (results) {
      return true;
    }

    return false;
  };
};

export const createClient = (client) => {
  return async () => {
    const result = await axios.post("/client", {
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
    const result = await axios.put(`/client/${client.id}`, {
      ...client,
    });
    if (!result) {
      return false;
    }
    return true;
  };
};
