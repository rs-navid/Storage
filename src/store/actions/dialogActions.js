import { SHOW_DIALOG, HIDE_DIALOG } from "./actionTypes";

export const showDialog = (action) => {
  const payload = {
    title: action.title,
    text: action.text,
    type: "ok",
    yes: null,
    no: null,
  };

  if (action.yes) payload["yes"] = action.yes;
  if (action.no) payload["no"] = action.no;
  if (action.type) payload["type"] = action.type;

  return {
    type: SHOW_DIALOG,
    payload: payload,
  };
};

export const hideDialog = () => {
  return {
    type: HIDE_DIALOG,
  };
};
