import React, { Fragment, Suspense, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { setUserToken } from "../../store/actions/userActions";

import Header from "../UI/header/Header";
import Sidebar from "../UI/sidebar/Sidebar";
import Spinner from "../UI/spinner/Spinner";

const Login = React.lazy(() => import("../screens/login/Login"));
const Dashboard = React.lazy(() => import("../screens/dashboard/Dashboard"));
const UserSetting = React.lazy(() => import("../screens/user-setting/UserSetting"));
const Setting = React.lazy(() => import("../screens/setting/Setting"));
const AdvanceSetting = React.lazy(() => import("../screens/advance-setting/AdvanceSetting"));
const Periods = React.lazy(() => import("../screens/periods/Periods"));
const Users = React.lazy(() => import("../screens/users/Users"));
const Clients = React.lazy(() => import("../screens/clients/Clients"));
const Methods = React.lazy(() => import("../screens/methods/Methods"));

const Exams = React.lazy(() => import("../screens/exams/Exams"));

const Layout = (props) => {
  let token = localStorage.getItem("token");
  if (!props.user.token && token) props.setUserToken(token);

  const [activeSidebar, setActiveSidebar] = useState(false);

  return (
    <Fragment>
      <Suspense fallback={<Spinner />}>
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
              <Route exact path="/advancesetting" component={AdvanceSetting} />
              <Route exact path="/periods" component={Periods} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/clients" component={Clients} />
              <Route exact path="/exams" component={Exams} />
              <Route exact path="/methods" component={Methods} />
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
