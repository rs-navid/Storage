import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Sidebar = (props) => {
  const overlayClass = ["sidebar-overlay"];
  const sidebarClass = ["sidebar"];

  if (props.active) {
    overlayClass.push("active");
    sidebarClass.push("active");
  }

  const [getItems, setItems] = useState(["", ""]);

  const setActiveClass = (num) => {
    const activeClasses = ["", ""];
    activeClasses[num] = "active";
    setItems(activeClasses);
  };

  return (
    <Fragment>
      <div className={overlayClass.join(" ")} onClick={() => props.onClick(false)}></div>
      <div className={sidebarClass.join(" ")}>
        <ul className="nav">
          <li className={getItems[0]}>
            <FontAwesomeIcon icon={faCog} className="icon" />
            <a
              href="#"
              onClick={() => {
                setActiveClass(0);
              }}
            >
              مدیریت سیستم
            </a>
            <FontAwesomeIcon icon={faChevronLeft} className="arrow" />
            <ul className="nav-dropdown">
              <li>
                <a href="#">مدیریت تنظیمات</a>
              </li>
              <li>
                <a href="#">مدیریت تنظیمات پیشرفته</a>
              </li>
              <li>
                <a href="#">مدیریت کاربران</a>
              </li>
            </ul>
          </li>
          <li className={getItems[1]}>
            <FontAwesomeIcon icon={faCog} className="icon" />
            <a
              href="#"
              onClick={() => {
                setActiveClass(1);
              }}
            >
              مدیریت سیستم
            </a>
            <FontAwesomeIcon icon={faChevronLeft} className="arrow" />
            <ul className="nav-dropdown">
              <li>
                <a href="#">مدیریت تنظیمات</a>
              </li>
              <li>
                <a href="#">مدیریت تنظیمات پیشرفته</a>
              </li>
              <li>
                <a href="#">مدیریت کاربران</a>
              </li>
            </ul>
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
