import React from "react";
import styled from "styled-components";

const Heading = styled.header`
  border: var(--main-border);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

function Header() {
  return (
    <Heading>
      <p>
        Hello: <span id="userName"></span>
      </p>
      <p>
        Wrong Tries: <span id="wrongCount">0</span>
      </p>
    </Heading>
  );
}

export default Header;
