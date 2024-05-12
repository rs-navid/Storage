import {
  SET_USER_TOKEN,
  SET_USER_PERIOD,
  REMOVE_USER_TOKEN,
  SET_USER_PERMISSIONS,
  SHOW_DIALOG,
} from "./actionTypes";
import axios from "axios";

export const login = (username, password, platform, remember) => {
  return async (dispatch) => {
    const user = await axios.post("/user/login", {
      username,
      password,
    });

    if (user) {
      localStorage.setItem("token", user.data[0]);
      localStorage.setItem("period", user.data[1]);
      dispatch(setUserToken(user.data[0], user.data[1]));
    }
  };
};

export const setUserToken = (token, period) => {
  return {
    type: SET_USER_TOKEN,
    payload: {
      token,
      period: Number(period)
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
    const result = await axios.post("/user/changepassword", {
      password: password,
      newpassword: newPassword,
    });

    if (result) {
      return dispatch({
        type: SHOW_DIALOG,
        payload: {
          type: "ok",
          title: "تایید تغییر کلمه عبور",
          text: "کلمه عبور با موفقیت تغییر کرد.",
        },
      });
    }
  };
};

export const getPeriods = () => {
  return async () => {
    const results = await axios.post("/user/getperiods");

    if (results) {
      return results.data;
    }
  };
};

export const changePeriod = (id) => {
  return async (dispatch) => {
    // const results = await axios.post("/user/changeperiod", { periodId: id });

      dispatch({
        type: SET_USER_PERIOD,
        payload: {
          period: id
        },
      });
      return dispatch({
        type: SHOW_DIALOG,
        payload: {
          type: "ok",
          title: "تایید تغییر دوره",
          text: "دوره با موفقیت تغییر کرد.",
        },
      });
  };
};

export const getPermissions = () => {
  return async (dispatch) => {
    const results = await axios.post("/user/getpermissions");

    if (results) {
      dispatch({
        type: SET_USER_PERMISSIONS,
        payload: results.data,
      });
    }
  };
};

export const getUsers = (query) => {
  return async () => {
    const results = await axios.post(`/user/getall`, { ...query, ordertype: query.order === "asc" ? false : true });
    if (results) {
      return results.data;
    }
  };
};

export const deleteUsers = (ids) => {
  return async () => {
    const results = await axios.post(`/user/deletebyids`, 
      { ids: ids },
    );
    if (results) {
      return true;
    }

    return false;
  };
};

export const createUser = (user) => {
  return async () => {
    const result = await axios.post("/user/register", {
      ...user,
    });
    if (!result) {
      return false;
    }
    return result;
  };
};

export const updateUser = (user) => {
  return async () => {
    const result = await axios.post(`/user/update`, {
      ...user,
    });
    if (!result) {
      return false;
    }
    return true;
  };
};

// export const getUserPermissions = (userId) => {
//   return async () => {
//     const result = await axios.post(`/user/getpermissionsbyid`, {userId});
//     if (!result) {
//       return [];
//     }
//     return result.data.permissions;
//   };
// };

export const getUserPermissions = (userId) => {
  return async () => {
    const result = await axios.post(`/user/getuserpermissions`, {id : Number(userId)});
    if (!result) {
      return [];
    }
    return result.data;
  };
};

export const getUserInfo = () => {
  return async () => {
    const info = await axios.post("/user/getinfo");
    if (info) {
      return info.data;
    }
    return false;
  };
};
