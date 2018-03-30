import React, { Component } from "react";
import styled from "styled-components";
import {
  Modal,
  Text,
  TextInput,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { ContainerCenterView, StackView } from "../components/ContainerView";
import { TextButton } from "./TextButton";
import { red, primary, gray, grayLight } from "../utils/colors";

class CreateDeckModal extends Component {
  state = {
    text: ""
  };

  resetState() {
    this.setState({
      text: ""
    });
  }

  render() {
    const { visible, buttonTapped } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={() => {}}
      >
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => Keyboard.dismiss()}
        >
          <ContainerCenterView>
            <CreateTitleText>新建卡片集</CreateTitleText>
            <DeckInput
              underlineColorAndroid={primary}
              autoFocus={true}
              placeholder={"请输入要创建的卡片集名称"}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
            <StackView>
              <TextButton
                text="取消"
                color={gray}
                onPress={() => {
                  buttonTapped("cancel");
                  this.resetState();
                }}
              />
              <TextButton
                text="确认"
                color={primary}
                onPress={() => {
                  buttonTapped("confirm", this.state.text);
                  this.resetState();
                }}
              />
            </StackView>
          </ContainerCenterView>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

export default CreateDeckModal;

const CreateTitleText = styled.Text`
  font-size: 32px;
  margin-bottom: 60px;
`;

const DeckInput =
  Platform.OS === "ios"
    ? styled.TextInput`
        height: 40px;
        width: 280px;
        padding: 0 8px;
        border-color: ${primary};
        border-radius: 5px;
        border-width: 1px;
      `
    : styled.TextInput`
        height: 60px;
        width: 280px;
        line-height: 60px;
        padding: 0 20px;
        font-size: 20px;
      `;
