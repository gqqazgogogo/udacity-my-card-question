import React from "react";
import styled from "styled-components";
import { Platform } from "react-native";
import { white, primary } from "../utils/colors";

export function TextButton({ text = "text", color = primary, ...props }) {
  return (
    <ButtonDark {...props} style={{ backgroundColor: color }}>
      <ButtonText>{text}</ButtonText>
    </ButtonDark>
  );
}

export function TextButtonLight({ text = "text", color = primary, ...props }) {
  return (
    <ButtonLight {...props} style={{ borderColor: color }}>
      <ButtonTextLight style={{ color: color }}>{text}</ButtonTextLight>
    </ButtonLight>
  );
}

const ButtonDark = styled.TouchableOpacity`
  align-items: center;
  margin: 80px 20px;
  padding: 20px 60px;
  ${Platform.OS === "ios" ? "border-radius: 5px;" : null};
`;
const ButtonText = styled.Text`
  color: ${white};
  ${Platform.OS === "ios" ? "font-size: 16px;" : "font-size: 20px;"};
`;

const ButtonLight = styled.TouchableOpacity`
  align-items: center;
  margin: 80px 20px;
  padding: 20px 60px;
  border-width: 2px;
  ${Platform.OS === "ios" ? "border-radius: 5px;" : null};
`;
const ButtonTextLight = styled.Text`
  ${Platform.OS === "ios" ? "font-size: 16px;" : "font-size: 20px;"};
`;
