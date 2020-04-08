import React, { Fragment } from "react";
import { CSSTransition } from "react-transition-group";
import Draggable from "react-draggable";
import { connect } from "react-redux";

import { hideDialog } from "../../../store/actions/dialogActions";

const Dialog = props => {
  const buttons =
    props.type === "confirm" ? (
      <Fragment>
        <button
          className="ml-5"
          onClick={() => {
            props.hideDialog();
            if(props.yes) props.yes();
          }}
        >
          بله
        </button>
        <button
          onClick={() => {
            props.hideDialog();
            if(props.no) props.no();
          }}
        >
          خیر
        </button>
      </Fragment>
    ) : (
      <button
        onClick={() => {
          props.hideDialog();
          if(props.yes) props.yes();
        }}
      >
        تایید
      </button>
    );

  const cls = ["dialog-container"];
  if (props.show) cls.push("show");

  return (
    <Fragment>
      <div className={cls.join(" ")}></div>
      <CSSTransition classNames="dialog" timeout={300} in={props.show} unmountOnExit mountOnEnter>
        <div className="dialog-box">
          <Draggable handle=".dialog-title">
            <div className="dialog">
              <div className="dialog-title">{props.title}</div>
              <div className="dialog-content">{props.text}</div>
              <div className="dialog-action">{buttons}</div>
            </div>
          </Draggable>
        </div>
      </CSSTransition>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    show: state.dialogReducer.show,
    type: state.dialogReducer.type,
    title: state.dialogReducer.title,
    text: state.dialogReducer.text,
    yes: state.dialogReducer.yes,
    no: state.dialogReducer.no
  };
};

export default connect(mapStateToProps, { hideDialog })(Dialog);
