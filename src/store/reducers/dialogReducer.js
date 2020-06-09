import { SHOW_DIALOG, HIDE_DIALOG } from "../actions/actionTypes";

const initialState = {
  show: false,
  type: "ok",
  title: null,
  text: null,
  yes: null,
  no: null,
};

export default (state = initialState, action) => {
  if (action.type === SHOW_DIALOG) {
    return {
      ...state,
      show: true,
      ...action.payload,
    };
  }

  if (action.type === HIDE_DIALOG) {
    return {
      show: false,
      type: "ok",
      title: null,
      text: null,
      yes: null,
      no: null,
    };
  }

  return state;
};
