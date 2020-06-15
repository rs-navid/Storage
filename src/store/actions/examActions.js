import axios from "axios";

export const getExams = (query) => {
  console.log(query);
  return async () => {
    const results = await axios.get(`/exam${query}`);
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getFirstExam = () => {
  return async () => {
    const results = await axios.get(`/exam/first`);
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const getExam = (id) => {
  return async () => {
    const results = await axios.get(`/exam/${id}`);
    if (results) {
      return results.data;
    }
    return false;
  };
};

export const deleteExams = (ids) => {
  return async () => {
    const results = await axios.delete(`/exam`, { data: { ids: ids } });
    if (results) {
      return true;
    }

    return false;
  };
};

export const createExam = (exam) => {
  return async () => {
    const result = await axios.post("/exam", {
      ...exam,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updateExam = (exam) => {
  return async () => {
    const result = await axios.put(`/exam/${exam.id}`, {
      ...exam,
    });
    if (!result) {
      return false;
    }
    return true;
  };
};
