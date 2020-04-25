import axios from "axios";

export const getRequests = (query) => {
  return async () => {
    const results = await axios.get(`/request?${query}`);
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getRequest = (id) => {
  return async () => {
    const results = await axios.get(`/request/${id}`);
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const deleteRequests = (ids) => {
  return async () => {
    const results = await axios.delete(`/request`, { data: { ids: ids } });
    if (results) {
      return true;
    }

    return false;
  };
};

export const createRequest = (request) => {
  return async () => {
    const result = await axios.post("/request", {
      ...request,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updateRequest = (request) => {
  return async () => {
    const result = await axios.put(`/request/${request.id}`, {
      ...request,
    });
    if (!result) {
      return false;
    }
    return true;
  };
};
