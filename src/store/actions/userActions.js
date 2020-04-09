import { SET_USER, REMOVE_USER, HIDE_SPINNER } from "./actionTypes";
import axios from "axios";

export const login = (username, password, platform, remember) => {
  return async (dispatch) => {
    const user = await axios.post("/user/login", { username, password, platform, remember });
    dispatch({ type: HIDE_SPINNER });

    if (user) {
      localStorage.setItem("user", JSON.stringify(user.data));
      dispatch(setUser(user.data));
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
    },
  };
};

export const removeUser = () => {
  localStorage.removeItem("user");

  return {
    type: REMOVE_USER,
  };
};
