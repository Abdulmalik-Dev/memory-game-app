import React, { Component } from "react";
import styled from "styled-components";

const Layout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(0 0 255 / 40%);
  z-index: 10;
  display: grid;
  place-items: center;

  button {
    padding: 1rem 3rem;
    background-color: var(--mainColor);
    color: white;
    border: 2px solid white;
    cursor: pointer;
  }

  p {
    color: white;
    font-size: 2rem;
  }
`;

// window.onload = () => window.scrollTo(0, 0);

class StartTheApp extends Component {
  constructor() {
    super();
    this.layoutEffect();
    this.startGame = this.startGame.bind(this);

    this.state = {
      userName: "",
    };
  }

  layoutEffect() {
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      this.setState({
        userName: prompt("Please, Enter Your Name..!"),
      });

      // Set The User Name
      document.getElementById("userName").innerHTML = this.state.userName;
    }, 100);
  }

  startGame(e) {
    document.body.style.overflow = "auto";

    // Remove The Layout
    e.target.parentElement.style.display = "none";
  }

  render() {
    return (
      <Layout id="layout">
        <button onClick={this.startGame}>Start</button>
      </Layout>
    );
  }
}

export default StartTheApp;
