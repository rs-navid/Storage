import React, { Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { showDialog } from "../store/actions/dialogActions";
import { showSpinner, hideSpinner } from "../store/actions/spinnerActions";
import { removeUserToken } from "../store/actions/userActions";

const WithErrorHandler = (props) => {
  const url = "http://localhost:3000";
  axios.defaults.baseURL = url;
  axios.defaults.headers["Authorization"] = props.token;

  axios.interceptors.request.use(
    (res) => {
      props.showSpinner();
      return res;
    },
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

  axios.interceptors.response.use(
    (res) => {
      props.hideSpinner();
      return res;
    },
    (err) => {
      if (err.response) {
        if (err.response.data.notLogin) {
          props.showDialog({ type: "ok", title: "خطا", text: err.response.data.message });
          props.removeUserToken();
        } else if (err.response.status === 403) {
          props.history.replace({ pathname: "/" });
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

export default withRouter(
  connect(mapStateToProps, { showDialog, hideSpinner, showSpinner, removeUserToken })(WithErrorHandler)
);
