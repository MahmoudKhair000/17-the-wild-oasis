import styled from "styled-components";

const Input = styled.input`
  margin-inline: auto;
  padding: 10px;
  /* width: 70%; */
  /* display: block; */
  border-radius: 10px;
  border: 1px solid #ccc;
  &::placeholder {
    color: gray;
  }
`;

export default Input;
