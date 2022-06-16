import React from "react";
import PropTypes from "prop-types";

const Input = (props) => {
  const cls = ["field-wrapper"];
  if (props.icon) cls.push("with-icon");

  const icon = props.icon ? (
    <span className="icon" style={props.iconstyle ? props.iconstyle : {}}>
      {props.icon}
    </span>
  ) : null;

  return (
    <div className={cls.join(" ")} style={{ position: "relative", margin: 0 }}>
      {icon}
      <input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        style={props.style}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
      {props.button ? (
        <span
          style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
          onClick={props.onButtonClick}
        >
          {props.button}
        </span>
      ) : null}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
