import React from "react";

const Sidemenu = (props) => {
  return <div className="sidemenu">{props.children}</div>;
};

export default Sidemenu;

export const Menu = (props) => {
  return (
    <div className="menu-wrapper">
      <div className="menu-title">{props.title}</div>
      <div className="menu-content">{props.children}</div>
    </div>
  );
};
