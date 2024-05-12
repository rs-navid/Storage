import * as actionTypes from "./../actions/actionTypes";

const initialState = {
  token: null,
  period: null,
  permissions: []
};

export default (state = initialState, action) => {
  if (action.type === actionTypes.SET_USER_TOKEN) {
    return {
      ...state,
      token: action.payload.token,
      period: action.payload.period,
    };
  }

  if (action.type === actionTypes.SET_USER_PERIOD) {
    return {
      ...state,
      period: action.payload.period,
    };
  }

  if (action.type === actionTypes.REMOVE_USER_TOKEN) {
    return {
      ...state,
      token: null,
      period: null
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
