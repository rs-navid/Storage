import React, { Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { showDialog } from "../store/actions/dialogActions";
import { hideSpinner } from "../store/actions/spinnerActions";
import { removeUserToken } from "../store/actions/userActions";

const WithErrorHandler = (props) => {
  const url = "http://localhost:3000";
  axios.defaults.baseURL = url;
  axios.defaults.headers["Authorization"] = props.token;

  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response) {
        if (err.response.data.notLogin) {
          props.showDialog({ type: "ok", title: "خطا", text: err.response.data.message });
          props.removeUserToken();
        } else {
          props.showDialog({ type: "ok", title: "خطا", text: err.response.data.message });
        }
      } else {
        props.showDialog({ type: "ok", title: "خطا", text: err.message });
      }
      props.hideSpinner();
    }
  );
  return <Fragment>{props.children}</Fragment>;
};

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps, { showDialog, hideSpinner, removeUserToken })(WithErrorHandler);
