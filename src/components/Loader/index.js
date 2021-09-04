import React from "react";
import styled, { keyframes } from "styled-components";

import PropTypes from "prop-types";

const loader = {
  "0%": {
    transform: "perspective(120px) rotateX(0deg) rotateY(0deg)",
  },
  "50%": {
    transform: "perspective(120px) rotateX(-180.1deg) rotateY(0deg)",
  },
  "100%": {
    transform: "perspective(120px) rotateX(-180deg) rotateY(-179.9deg)",
  },
};

const loadingAnimation = keyframes`${loader}`;

const StyledDiv = styled.div`
  width: 40px;
  height: 40px;
  background-color: red;
  animation: ${loadingAnimation} 1.2s infinite ease-in-out;
`;

const Loader = ({ color, size, ...rest }) => {
  return <StyledDiv color={color} size={size} />;
};

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

export default Loader;
