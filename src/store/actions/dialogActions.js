import { SHOW_DIALOG, HIDE_DIALOG } from "./actionTypes";

export const showDialog = (action) => {
  const payload = {
    title: action.title,
    text: action.text,
    type: "ok"
  };

  if (action.yse) payload["yse"] = action.yse;
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
