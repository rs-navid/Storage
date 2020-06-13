import axios from "axios";

export const getCaptcha = () => {
  return async () => {
    const result = await axios.get(`/captcha`, {
      // responseType: "arraybuffer",
    });
    if (!result) {
      return false;
    }
    return result;
  };
};