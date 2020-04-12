import React, { Fragment, Suspense, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { setUserToken } from "../../store/actions/userActions";

import Header from "../UI/header/Header";
import Sidebar from "../UI/sidebar/Sidebar";

const Login = React.lazy(() => import("../screens/login/Login"));
const Dashboard = React.lazy(() => import("../screens/dashboard/Dashboard"));
const UserSetting = React.lazy(() => import("../screens/user-setting/UserSetting"));
const Setting = React.lazy(() => import("../screens/setting/Setting"));

const Layout = (props) => {
  let token = localStorage.getItem("token");
  if (!props.user.token && token) props.setUserToken(token);

  const [activeSidebar, setActiveSidebar] = useState(false);


  return (
    <Fragment>
      <Suspense fallback="Loading...">
        {!props.user.token ? (
          <Switch>
            <Route path="/" component={Login} />
            {/* <Redirect to="/"/> */}
          </Switch>
        ) : (
          <Fragment>
            <Header onClick={setActiveSidebar} />
            <Sidebar active={activeSidebar} onClick={setActiveSidebar} />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/usersetting" component={UserSetting} />
              <Route exact path="/setting" component={Setting} />
            </Switch>
          </Fragment>
        )}
      </Suspense>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

export default connect(mapStateToProps, { setUserToken })(Layout);
