import { SHOW_DIALOG } from "./actionTypes";
import axios from "axios";

export const getSetting = (name) => {
  return async () => {
    const result = await axios.get(`/setting/${name}`);
    return result.data;
  };
};

export const saveSetting = (data) => {
  return async (dispatch) => {
    const result = await axios.post(`/setting`, data);

    if (result) {
      return dispatch({
        type: SHOW_DIALOG,
        payload: { type: "ok", title: "تایید ثبت", text: "تنظیمات با موفقیت ثبت گردید." },
      });
    }
  };
};

export const getAdvanceSetting = () => {
  return async () => {
    const result = await axios.get(`/setting/advance`);
    return result.data;
  };
};

export const saveAdvanceSetting = (data) => {
  return async (dispatch) => {
    const result = await axios.post(`/setting/advance`, data);

    if (result) {
      return dispatch({
        type: SHOW_DIALOG,
        payload: { type: "ok", title: "تایید ثبت", text: "تنظیمات با موفقیت ثبت گردید." },
      });
    }
  };
};

