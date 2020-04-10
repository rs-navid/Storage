import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPowerOff, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { removeUserToken } from "../../../store/actions/userActions";

const Header = (props) => {
  return (
    <div className="header">
      <div className="info">
        <span className="menu-icon" onClick={() => props.onClick(true)}>
          <FontAwesomeIcon icon={faBars} fixedWidth />
        </span>
      </div>
      <div>
      <Link to={{pathname:'usersetting'}}>
        <span className="user-setting" title="تنظیمات کاربر">
          <FontAwesomeIcon icon={faUserCog} fixedWidth />
        </span>
        <span className="logout" title="خروج" onClick={props.removeUserToken}>
          <FontAwesomeIcon icon={faPowerOff} fixedWidth />
        </span>
      </Link>
      </div>
    </div>
  );
};

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.userReducer.name,
  periodName: state.userReducer.periodName,
});

export default connect(mapStateToProps, { removeUserToken })(Header);
