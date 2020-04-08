import React, { Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { showDialog } from "../store/actions/dialogActions";

const WithErrorHandler = (props) => {
  const url = "http://localhost:3000";
  console.log(url);
  axios.defaults.baseURL = url.toString();
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if(err.response){
        props.showDialog({ type: "ok", title: "خطا", text: err.response.data.message });
      } else {
        props.showDialog({ type: "ok", title: "خطا", text: err.message });
      }
    }
  );
  return <Fragment>{props.children}</Fragment>;
};

export default connect(null, { showDialog })(WithErrorHandler);
