import * as actionTypes from "./../actions/actionTypes";

const initialState = {
  token: null,
  permissions: []
};

export default (state = initialState, action) => {
  if (action.type === actionTypes.SET_USER_TOKEN) {
    return {
      ...state,
      token: action.payload.token,
    };
  }

  if (action.type === actionTypes.REMOVE_USER_TOKEN) {
    return {
      ...state,
      token: null,
    };
  }

  if (action.type === actionTypes.SET_USER_PERMISSIONS) {
    return {
      ...state,
      permissions: action.payload,
    };
  }

  return state;
};
