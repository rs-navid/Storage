import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./store/store";
import "semantic-ui-css/semantic.min.css";
import "./assets/css/app.scss";
import Dialog from "./components/UI/dialog/Dialog";
import Spinner from "./components/UI/spinner/Spinner";
import WithErrorHandler from "./hoc/WithErrorHandler";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <WithErrorHandler>
            <Dialog />
            <Spinner />
            <Layout />
          </WithErrorHandler>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
