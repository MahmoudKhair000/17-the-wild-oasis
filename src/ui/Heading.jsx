/* eslint-disable no-unused-vars */
import styled, { css } from "styled-components";

const x = 5;

// const test = css`
//   text-align: center;
// `;

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 4rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2.5rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2.5rem;
      font-weight: 500;
    `}
  text-transform: capitalize;
`;

export default Heading;
