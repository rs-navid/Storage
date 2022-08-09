import axios from "axios";

export const getNewSampleNum = () => {
  return async () => {
    const results = await axios.get('/sample');
    if (results) {
      return results.data;
    }
    return false;
  }
}

export const getSamples = (requestId) => {
  return async () => {
    const results = await axios.get(`/sample/getall/${requestId}`);
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getMethodById = (id) => {
  return async () => {
    const results = await axios.get(`/samplemethod/getmethodbyid/${id}`);
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

export const getPointsBySampleId = (id) => {
  return async () => {
    const results = await axios.get(`/sample/points/${id}`);
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

export const updatePointsBySampleId = (id, points, descriptions) => {
  return async () => {
    const result = await axios.put(`/sample/points/${id}`, {
      points,
      descriptions,
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

export const updateSampleDiscount = (id, discount) => {
  return async () => {
    const result = await axios.put(`/sample/discount/${id}`, {
      discount: discount,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updateRequestTax = (id, tax) => {
  return async () => {
    const result = await axios.put(`/request/tax/${id}`, {
      tax: tax,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updateMethod = (id, data) => {
  return async () => {
    const result = await axios.put(`/samplemethod/update/${id}`, data);
    if (!result) {
      return false;
    }
    return result;
  };
};

export const print = (id, data) => {
  return async () => {
    const result = await axios.post(`/sample/print/${id}`, data, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf",
      },
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const newPrint = (id, data) => {
  return async () => {
    const result = await axios.post(`/sample/newprint/${id}`, data, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf",
      },
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const printeEvironmentResults = (id, data) => {
  return async () => {
    const result = await axios.post(`/sample/printenvironment/${id}`, data, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf",
      },
    });
    if (!result) {
      return false;
    }
    return result;
  };
};
