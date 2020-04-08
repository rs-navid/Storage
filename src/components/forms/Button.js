import React from "react";

const Button = props => {
  const cls = ["btn"];
  if (props.cls) cls.push(props.cls);

  return (
    <button className={cls.join(" ")} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
