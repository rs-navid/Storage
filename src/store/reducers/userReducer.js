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
  } else if (action.type === actionTypes.REMOVE_USER) {
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
