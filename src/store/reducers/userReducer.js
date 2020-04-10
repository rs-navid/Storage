import * as actionTypes from "./../actions/actionTypes";

const initialState = {
  userId: null,
  token: null,
  username: null,
  name: null,
  periodId: null,
  periodName: null,
};

export default (state = initialState, action) => {
  if (action.type === actionTypes.SET_USER) {
    return {
      ...state,
      userId: action.payload.userId,
      token: action.payload.token,
      username: action.payload.username,
      name: action.payload.name,
      periodId: action.payload.periodId,
      periodName: action.payload.periodName,
    };
  }

  if (action.type === actionTypes.SET_USER_TOKEN) {
    return {
      userId: null,
      token: action.payload.token,
      username: null,
      name: null,
      periodId: null,
      periodName: null,
    };
  }

  if (action.type === actionTypes.REMOVE_USER_TOKEN) {
    return {
      ...state,
      userId: null,
      token: null,
      username: null,
      name: null,
      periodId: null,
      periodName: null,
    };
  }

  return state;
};
