import React from "react";
import PropTypes from "prop-types";

const Input = props => {
  const cls = ["field-wrapper"];
  if (props.icon) cls.push("with-icon");

  const icon = props.icon ? (
    <span className="icon" style={props.iconstyle ? props.iconstyle : {}}>
      {props.icon}
    </span>
  ) : null;

  return (
    <div className={cls.join(" ")}>
      {icon}
      <input
        {...props}
        onChange={e => {
          props.onChange(e.target.value);
        }}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Input;
