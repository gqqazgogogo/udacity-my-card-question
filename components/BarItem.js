import React from "react";
import styled from "styled-components";
import { Platform } from "react-native";
import { white, primary } from "../utils/colors";
import { Constants } from "expo";

export default function BarItem({ text = "text", ...props }) {
  return (
    <BarButton {...props}>
      <BarText>{text}</BarText>
    </BarButton>
  );
}

const BarButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  height: ${Constants.statusBarHeight}px;
`;
const BarText = styled.Text`
  color: ${white};
  ${Platform.OS === "ios" ? "font-size: 16px;" : "font-size: 18px;"};
`;
