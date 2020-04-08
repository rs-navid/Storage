import { SHOW_SPINNER, HIDE_SPINNER } from "../actions/actionTypes";

const initialState = {
  show: false,
};

export default (state = initialState, action) => {
  if (action.type === SHOW_SPINNER) {
    return { show: true };
  }

  if (action.type === HIDE_SPINNER) {
    return { show: false };
  }

   return state;
};
