import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPowerOff, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { removeUser } from "../../../store/actions/userActions";

const Header = (props) => {
  return (
    <div className="header">
      <div>
        <span className="user-name">{props.userName}</span>
      </div>
      <div>
        <span className="user-setting" title="تنظیمات کاربر">
          <FontAwesomeIcon icon={faUserCog} fixedWidth />
        </span>
        <span className="logout" title="خروج" onClick={props.removeUser}>
          <FontAwesomeIcon icon={faPowerOff} fixedWidth />
        </span>
        <span className="menu-icon" onClick={() => props.onClick(true)}>
          <FontAwesomeIcon icon={faBars} fixedWidth />
        </span>
      </div>
    </div>
  );
};

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.userReducer.name,
});

export default connect(mapStateToProps, { removeUser })(Header);
