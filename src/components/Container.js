import React, { Component } from "react";
import styled from "styled-components";
import Header from "./Header";
import MemoryBlocks from "./MemoryBlocks";

const ContainerStyle = styled.div`
  padding: 1rem;
  margin: 1rem;

  @media (min-width: 1220px) {
    & {
      max-width: 1220px;
    }
  }
`;

class Container extends Component {
  render() {
    return (
      <ContainerStyle>
        <Header />
        <MemoryBlocks img="../images/01.jpg" />
      </ContainerStyle>
    );
  }
}

export default Container;
