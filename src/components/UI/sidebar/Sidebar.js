import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { getPermissions } from "../../../store/actions/userActions";
import permissions from "../../../configs/permissions";

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
    document.body.classList.add("disable-scroll");
  } else {
    document.body.classList.remove("disable-scroll");
  }

  const handleClose = () => {
    props.onClick(false);
  };

  const checkPermission = (container) => {
    if (container.length === 0) return true;
    // if(!props.permissions) return false;

    return props.permissions.some((val) => {
      return container.includes(val);
    });
  };

  return (
    <Fragment>
      <div className={overlayClass.join(" ")} onClick={handleClose}></div>
      <div className={sidebarClass.join(" ")}>
        <div className="close" onClick={handleClose}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div className="sep"></div>
        <ul className="nav">
          {permissions.map((item, index) => {
            if (item.type === "sep") {
              if (checkPermission(item.container)) {
                return <li className="sep" key={index}></li>;
              }
            } else {
              if (props.permissions.includes(item.id)) {
                return (
                  <Link to={{ pathname: item.path, search:`?${item.search ? item.search : ""}` }} key={index} onClick={handleClose}>
                    <li className="item">
                      <FontAwesomeIcon icon={item.icon} fixedWidth className="icon" />
                      <div>{item.text}</div>
                    </li>
                  </Link>
                );
              }
            }

            return null;
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
