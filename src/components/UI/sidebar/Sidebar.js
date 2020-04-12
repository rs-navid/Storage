import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faSlidersH,
  faChevronRight,
  faUsers,
  faHistory,
  faVial,
  faVials,
  faCopy,
  faRestroom,
} from "@fortawesome/free-solid-svg-icons";

import { getPermissions } from "../../../store/actions/userActions";

const menu = [
  {
    id: 100,
    text: "تنظیمات",
    icon: faCog,
    path: "/setting",
  },
  {
    id: 120,
    text: "تنظیمات پیشرفته",
    icon: faSlidersH,
    path: "/advancesetting",
  },
  {
    id: 200,
    text: "مدیریت کاربران",
    icon: faUsers,
    path: "/users",
  },
  {
    id: 300,
    text: "مدیریت دوره ها",
    icon: faHistory,
    path: "/periods",
  },
  {
    id: 400,
    text: "مدیریت مشتریان",
    icon: faRestroom,
    path: "/clients",
  },
  {
    type: "sep",
    container: [100, 120, 200, 300, 400],
  },
  {
    id: 500,
    text: "مدیریت آزمون ها",
    icon: faVial,
    path: "/exams",
  },
  {
    id: 550,
    text: "مدیریت روش های آزمون",
    icon: faVials,
    path: "/methods",
  },
  {
    id: 600,
    text: "مدیریت درخواست ها",
    icon: faCopy,
    path: "/requests",
  },
  {
    type: "sep",
    container: [500, 550, 600],
  },
];

const Sidebar = (props) => {
  // Component did mount
  useEffect(() => {
    props.getPermissions();
    // eslint-disable-next-line
  }, []);

  const overlayClass = ["sidebar-overlay"];
  const sidebarClass = ["sidebar"];

  if (props.active) {
    overlayClass.push("active");
    sidebarClass.push("active");
    document.body.classList.add('disable-scroll')
  } else {
    document.body.classList.remove('disable-scroll')
  }

  const checkPermission = (container) => {
    if (container.length === 0) return true;
    // if(!props.permissions) return false;

    return props.permissions.some((val) => {
      return container.includes(val);
    });
  };

  return (
    <Fragment>
      <div className={overlayClass.join(" ")} onClick={() => props.onClick(false)}></div>
      <div className={sidebarClass.join(" ")}>
        <div className="close" onClick={() => props.onClick(false)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div className="sep"></div>
        <ul className="nav">
          {menu.map((item,index) => {
            if (item.type === "sep") {
              if (checkPermission(item.container)) {
                return <li className="sep" key={index}></li>;
              }
            } else {
              if (props.permissions.includes(item.id)) {
                return (
                  <Link to={{ pathname: item.path }} key={index}>
                    <li className="item">
                      <FontAwesomeIcon icon={item.icon} fixedWidth className="icon" />
                      <div>{item.text}</div>
                    </li>
                  </Link>
                );
              }
            }
          })}
        </ul>
      </div>
    </Fragment>
  );
};

Sidebar.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  permissions: state.userReducer.permissions,
});

export default connect(mapStateToProps, { getPermissions })(Sidebar);
