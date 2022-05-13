import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import Container from "./components/Container";
import StartTheApp from "./components/StartTheApp";

ReactDOM.render(
  <div>
    <StartTheApp />
    <Container />
  </div>,
  document.getElementById("root")
);
