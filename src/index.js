import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import "sanitize.css";
import * as serviceWorker from "./serviceWorker";
import { Model } from "./Model.js";

ReactDOM.render(<App model={Model} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
