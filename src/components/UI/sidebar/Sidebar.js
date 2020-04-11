import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSlidersH, faChevronRight, faUsers, faHistory, faVial, faVials, faCopy } from "@fortawesome/free-solid-svg-icons";

const Sidebar = (props) => {
  const overlayClass = ["sidebar-overlay"];
  const sidebarClass = ["sidebar"];

  if (props.active) {
    overlayClass.push("active");
    sidebarClass.push("active");
  }

  return (
    <Fragment>
      <div className={overlayClass.join(" ")} onClick={() => props.onClick(false)}></div>
      <div className={sidebarClass.join(" ")}>
        <div className="close" onClick={() => props.onClick(false)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>

        <ul className="nav">
          <li>
            <FontAwesomeIcon icon={faCog} fixedWidth className="icon" />
            <div>تنظیمات</div>
          </li>
          <li>
            <FontAwesomeIcon icon={faSlidersH} fixedWidth className="icon" />
            <div>تنظیمات پیشرفته</div>
          </li>
          <li>
            <FontAwesomeIcon icon={faUsers} fixedWidth className="icon" />
            <div>مدیریت کاربران</div>
          </li>
          <li>
            <FontAwesomeIcon icon={faHistory} fixedWidth className="icon" />
            <div>مدیریت دوره ها</div>
          </li>
          <li>
            <FontAwesomeIcon icon={faVial} fixedWidth className="icon" />
            <div>مدیریت آزمون ها</div>
          </li>
          <li>
            <FontAwesomeIcon icon={faVials} fixedWidth className="icon" />
            <div>مدیریت روش های آزمون</div>
          </li>
          <li>
            <FontAwesomeIcon icon={faCopy} fixedWidth className="icon" />
            <div>مدیریت درخواست ها</div>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

Sidebar.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Sidebar;
