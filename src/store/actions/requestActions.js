import axios from "axios";

export const getRequests = (query, type) => {
  if (!type) {
    return async () => {
      const results = await axios.get(`/request?${query}`);
      if (results) {
        return results.data;
      }
      return false;
    };
  } else {
    return async () => {
      const results = await axios.get(`/request/${type}?${query}`);
      if (results) {
        return results.data;
      }
      return false;
    };
  }
};

export const getRequestsByType = (query, type) => {
  return async () => {
    const results = await axios.post(`/request/bytype${type}?${query}`, { type });
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

export const print = (id) => {
  return async () => {
    const result = await axios.get(`/request/print/${id}`, {
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

export const printInvoice = (id) => {
  return async () => {
    const result = await axios.get(`/request/printinvoice/${id}`, {
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

export const printFactor = (id) => {
  return async () => {
    const result = await axios.get(`/request/printfactor/${id}`, {
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

export const updateRequestInvoice = (id, invoice) => {
  return async () => {
    const result = await axios.put(`/request/invoice/${id}`, {
      invoice: invoice,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updateRequestIsPaid = (id, isPaid) => {
  return async () => {
    const result = await axios.put(`/request/paid/${id}`, {
      isPaid: isPaid,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const deleteRequestInvoice = (id) => {
  return async () => {
    const result = await axios.delete(`/request/invoice/${id}`);
    if (!result) {
      return false;
    }
    return result;
  };
};
