import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  border: 2px solid #fff100;
  padding: 20px 5px;
`;

const Card = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Card;
