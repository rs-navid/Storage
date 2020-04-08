import React, { Fragment } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

const Spinner = (props) => {
  const cls = ["spinner-container"];
  if (props.show) cls.push("show");

  return (
    <Fragment>
      <div className={cls.join(" ")}></div>
      <CSSTransition classNames="spinner" timeout={300} in={props.show} unmountOnExit mountOnEnter>
        <div className="spinner-box">
          <div className="spinner">
            <div className="sk-folding-cube">
              <div className="sk-cube1 sk-cube"></div>
              <div className="sk-cube2 sk-cube"></div>
              <div className="sk-cube4 sk-cube"></div>
              <div className="sk-cube3 sk-cube"></div>
            </div>
            <div className="spinner-content">در حال پردازش ...</div>
          </div>
        </div>
      </CSSTransition>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  show: state.spinnerReducer.show,
});

export default connect(mapStateToProps, {})(Spinner);
