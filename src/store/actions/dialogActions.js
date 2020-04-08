import { SHOW_DIALOG, HIDE_DIALOG } from "./actionTypes";

export const showDialog = action => {
  const payload = {
    yes: action.yes,
    title: action.title,
    text: action.text
  };

  if (action.no) payload["no"] = action.no;
  if (action.type) payload["type"] = action.type;

  return {
    type: SHOW_DIALOG,
    payload: payload
  };
};

export const hideDialog = () => {
  return {
    type: HIDE_DIALOG
  };
};
