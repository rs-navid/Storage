import React from "react";
import PropTypes from "prop-types";

const Checkbox = props => {
  const cls = ["field-checkbox", "text-right"];
  if (props.cls) cls.push(props.cls);

  return (
    <label className={cls.join(" ")}>
      <input
        type="checkbox"
        name={props.name}
        onChange={e => {
          props.onChange(e.target.checked);
        }}
      />
      <div className="checkmark" style={props.checkstyle ? props.checkstyle : {}}></div>
      {props.children}
    </label>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Checkbox;
