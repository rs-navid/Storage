import axios from "axios";

export const getCaptcha = () => {
  return async () => {
    const result = await axios.get(`/captcha`, {
      // 
    });
    if (!result) {
      return false;
    }
    return result;
  };
};