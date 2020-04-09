import React, { Fragment, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { setUser } from "../../store/actions/userActions";

const Login = React.lazy(() => import("../login/Login"));
const Dashboard = React.lazy(() => import("../dashboard/Dashboard"));

const Router = (props) => {
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);
  if (!props.user.token && user && user.token && user.username && user.name && user.userId) props.setUser(user);

  return (
    <Fragment>
      <Suspense fallback="Loading...">
        {!props.user.token ? (
          <Switch>
            <Route exact path="/" component={Login} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Dashboard} />
          </Switch>
        )}
      </Suspense>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

export default connect(mapStateToProps, { setUser })(Router);
