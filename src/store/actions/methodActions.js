import axios from "axios";

export const getMethodsByExamId = (id) => {
  return async () => {
    const results = await axios.get(`/method/all/${id}`);
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getMethod = (id) => {
  return async () => {
    const results = await axios.get(`/method/${id}`);
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const deleteMethods = (ids) => {
  return async () => {
    const results = await axios.delete(`/method`, { data: { ids: ids } });
    if (results) {
      return true;
    }

    return false;
  };
};

export const createMethod = (method) => {
  return async () => {
    const result = await axios.post("/method", {
      ...method,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updateMethod = (method) => {
  return async () => {
    const result = await axios.put(`/method/${method.id}`, {
      ...method,
    });
    if (!result) {
      return false;
    }
    return true;
  };
};
