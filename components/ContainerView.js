import React from "react";
import styled from "styled-components";
import { grayLightest } from "../utils/colors";

export const ContainerView = styled.View`
  flex: 1;
  background-color: ${grayLightest};
`;

export const ContainerCenterView = styled.View`
  flex: 1;
  background-color: ${grayLightest};
  align-items: center;
  justify-content: center;
`;

export const StackView = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
