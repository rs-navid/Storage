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
const Storages = React.lazy(() => import("../screens/storages/Storages"));
const Units = React.lazy(() => import("../screens/units/Units"));
const Results = React.lazy(() => import("../screens/results/Results"));
const Results1 = React.lazy(() => import("../screens/results/Results"));
const Results2 = React.lazy(() => import("../screens/results/Results"));
const Results3 = React.lazy(() => import("../screens/results/Results"));
const Results4 = React.lazy(() => import("../screens/results/Results"));
const ResultManagement = React.lazy(() => import("../screens/results-management/Results"));
const Invoices = React.lazy(() => import("../screens/invoice/Invoices"));
const RequestsReport = React.lazy(() => import("../screens/requests-report/RequestsReport"));
const SamplesReport = React.lazy(() => import("../screens/sampless-report/SamplesReport"));

const Packs = React.lazy(() => import("../screens/packs/Packs"));

const Layout = (props) => {
  let token = localStorage.getItem("token");
  let period = localStorage.getItem("period");

  if (!props.user.token && token && !props.user.period && period) props.setUserToken(token, period);

  const [activeSidebar, setActiveSidebar] = useState(false);

  return (
    <Fragment>
      <Suspense fallback={<Spinner />}>
        {!props.user.token || !props.user.period ? (
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
              <Route exact path="/packs" component={Packs} />
              <Route exact path="/storages" component={Storages} />
              <Route exact path="/units" component={Units} />
              <Route exact path="/microbilaresults" component={Results} />
              <Route exact path="/chemicalresults" component={Results1} />
              <Route exact path="/celluloseresults" component={Results2} />
              <Route exact path="/packingresults" component={Results3} />
              <Route exact path="/environmentresults" component={Results4} />
              <Route exact path="/resultsmanagement" component={ResultManagement} />
              <Route exact path="/invoicemanagement" component={Invoices} />
              <Route exact path="/requestsreport" component={RequestsReport} />
              <Route exact path="/samplesreport" component={SamplesReport} />
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
