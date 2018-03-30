import React, { Component } from "react";
import styled from "styled-components";
import {
  Modal,
  Text,
  Platform,
  Keyboard,
  Switch,
  TouchableWithoutFeedback
} from "react-native";
import { ContainerCenterView, StackView } from "../components/ContainerView";
import { TextButton } from "./TextButton";
import { red, primary, gray, grayLight } from "../utils/colors";

class CreateCardModal extends Component {
  state = {
    text: "",
    answer: true
  };

  resetState() {
    this.setState({
      text: "",
      answer: true
    });
  }

  render() {
    const { visible, buttonTapped } = this.props;

    // tag: #02 这里我使用TouchableWithoutFeedback onPress时收起键盘，是在网上找到的方案，感觉很奇怪
    // 我想知道RN有没有类似iOS中textFieldShouldReturn那种代理方法或其他方法实现点击空白收起键盘
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
            <CreateTitleText>新增卡片</CreateTitleText>
            <DeckInput
              underlineColorAndroid={primary}
              autoFocus={true}
              placeholder={"请输入要新增的卡片名称"}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
            <StackView>
              <Text>错误</Text>
              <Switch
                value={this.state.answer}
                onValueChange={answer => this.setState({ answer })}
                onTintColor={primary}
              />
              <Text>正确</Text>
            </StackView>

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
                  buttonTapped("confirm", this.state);
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

export default CreateCardModal;

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
