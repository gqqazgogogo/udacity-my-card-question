import React from "react";
import styled from "styled-components";
import { Entypo } from "@expo/vector-icons";
import { Platform } from "react-native";
import { gray, grayLight } from "../utils/colors";

export default function DeckItem({ title, cards, ...props }) {
  return (
    <TouchableItem {...props}>
      <TitleText>{title}</TitleText>
      <NumText>
        {cards.length}张<Entypo name="chevron-thin-right" />
      </NumText>
    </TouchableItem>
  );
}

const TouchableItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 12px 20px;
  ${Platform.OS === "ios" ? "margin-left: 12px;" : null}
  border-color: ${grayLight};
  border-bottom-width: 1px;
`;
const TitleText = styled.Text`
  font-size: 32px;
`;
const NumText = styled.Text`
  font-size: 16px;
  color: ${gray};
`;
