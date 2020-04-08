import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import dialogReducer from "./reducers/dialogReducer";
import spinnerReducer from "./reducers/spinnerReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({ userReducer, dialogReducer, spinnerReducer }),
  composeEnhancers(applyMiddleware(reduxThunk))
);
//const store = createStore(combineReducers({}), applyMiddleware(reduxThunk));

export default store;
