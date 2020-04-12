import {
  SET_USER_TOKEN,
  REMOVE_USER_TOKEN,
  SET_USER_PERMISSIONS,
  SHOW_DIALOG,
} from "./actionTypes";
import axios from "axios";

export const login = (username, password, platform, remember) => {
  return async (dispatch) => {
    const user = await axios.post("/user/login", { username, password, platform, remember });

    if (user) {
      localStorage.setItem("token", user.data.token);
      dispatch(setUserToken(user.data.token));
    }
  };
};

export const setUserToken = (token) => {
  return {
    type: SET_USER_TOKEN,
    payload: {
      token,
    },
  };
};

export const removeUserToken = () => {
  localStorage.removeItem("token");
  return {
    type: REMOVE_USER_TOKEN,
  };
};

export const changePassword = (password, newPassword) => {
  return async (dispatch) => {
    const result = await axios.put("/user/changecurrentuserpassword", {
      password: password,
      new_password: newPassword,
    });

    if (result) {
      return dispatch({
        type: SHOW_DIALOG,
        payload: { type: "ok", title: "تایید تغییر کلمه عبور", text: "کلمه عبور با موفقیت تغییر کرد." },
      });
    }
  };
};

export const getUserPeriodAndAllPeriods = () => {
  return async () => {
    const results = await axios.post("/user/getuserperiod");

    if (results) {
      return results.data;
    }
  };
};

export const changePeriod = (id) => {
  return async (dispatch) => {
    const results = await axios.post("/user/changeperiod", { periodId: id });

    if (results) {
      return dispatch({
        type: SHOW_DIALOG,
        payload: { type: "ok", title: "تایید تغییر دوره", text: "دوره با موفقیت تغییر کرد." },
      });
    }
  };
};

export const getPermissions = () => {
  return async (dispatch) => {
    const results = await axios.get("/user/permissions");

    if (results) {
      dispatch({
        type: SET_USER_PERMISSIONS,
        payload: results.data.permissions,
      });
    }
  };
};
