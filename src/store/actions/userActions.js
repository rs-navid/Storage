import { SET_USER, REMOVE_USER, HIDE_SPINNER, SET_USER_TOKEN, REMOVE_USER_TOKEN, SHOW_SPINNER, SHOW_DIALOG } from "./actionTypes";
import axios from "axios";

export const login = (username, password, platform, remember) => {
  return async (dispatch) => {
    const user = await axios.post("/user/login", { username, password, platform, remember });
    dispatch({ type: HIDE_SPINNER });

    if (user) {
      localStorage.setItem("token", user.data.token);
      dispatch(setUserToken(user.data.token));
    }
  };
};

export const setUser = (data) => {
  return {
    type: SET_USER,
    payload: {
      username: data.username,
      token: data.token,
      name: data.name,
      userId: data.userId,
      periodName: data.periodName,
      periodId: data.periodId,
    },
  };
};

export const removeUser = () => {
  localStorage.removeItem("token");
  
  return {
    type: REMOVE_USER,
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
    type: REMOVE_USER_TOKEN
  };
};

export const changePassword = (password, newPassword) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_SPINNER });
    const result = await axios.put("/user/changecurrentuserpassword", {
      password: password,
      new_password: newPassword,
    });

    if (result) {
      dispatch({ type: HIDE_SPINNER });
      return dispatch({
        type: SHOW_DIALOG,
        payload: { type: "ok", title: "تایید تغییر کلمه عبور", text: "کلمه عبور با موفقیت تغییر کرد." },
      });
    }
  };
};
