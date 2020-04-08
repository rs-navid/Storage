import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./store/store";
import "semantic-ui-css/semantic.min.css";
import "./assets/css/app.scss";
import Dialog from "./components/UI/dialog/Dialog";
import Spinner from "./components/UI/spinner/Spinner";
import WithErrorHandler from "./hoc/WithErrorHandler";
import Router from "./components/router/Router";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <WithErrorHandler>
            <Dialog />
            <Spinner />
            <Router />
          </WithErrorHandler>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
