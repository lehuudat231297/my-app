import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store, history } from "./store";
// import { ConnectedRouter } from 'react-router-redux';

ReactDOM.render(
    <Provider store={store}>
        {/* <ConnectedRouter history={history}> */}
        <HashRouter>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </HashRouter>
        {/* </ConnectedRouter> */}
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
