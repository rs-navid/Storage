import axios from "axios";

export const getSamples = (requestId) => {
  return async () => {
    const results = await axios.get(`/sample/getall/${requestId}`);
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getSample = (id) => {
  return async () => {
    const results = await axios.get(`/sample/${id}`);
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const deleteSamples = (ids) => {
  return async () => {
    const results = await axios.delete(`/sample`, { data: { ids: ids } });
    if (results) {
      return true;
    }

    return false;
  };
};

export const createSample = (sample) => {
  return async () => {
    const result = await axios.post("/sample", {
      ...sample,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updateSample = (sample) => {
  return async () => {
    const result = await axios.put(`/sample/${sample.id}`, {
      ...sample,
    });
    if (!result) {
      return false;
    }
    return true;
  };
};
