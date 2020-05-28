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

export const getSamplesByType = (requestId, type) => {
  return async () => {
    const results = await axios.post(`/sample/getallbytype/${requestId}`, { type });
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

export const getSampleMethods = (id) => {
  return async () => {
    const result = await axios.get(`/samplemethod/getbysampleid/${id}`);
    if (!result) {
      return false;
    }
    return result.data;
  };
};

export const getSampleMethodsByType = (id, type) => {
  return async () => {
    const result = await axios.post(`/samplemethod/getbysampleidandtype/${id}`, { type });
    if (!result) {
      return false;
    }
    return result.data;
  };
};

export const deleteMethods = (ids) => {
  return async () => {
    const results = await axios.delete(`/samplemethod`, { data: { ids: ids } });
    if (results) {
      return true;
    }

    return false;
  };
};

export const createMethods = (sampleId, ids) => {
  return async () => {
    const result = await axios.post(`/samplemethod/${sampleId}`, {
      methods: ids,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updateMethodPrice = (id, price) => {
  return async () => {
    const result = await axios.put(`/samplemethod/${id}`, {
      price: price,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};
