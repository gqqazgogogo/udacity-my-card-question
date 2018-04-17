// @flow
import React, { Component } from "react";
import styled from "styled-components";
import { Platform, Text } from "react-native";
import { connect } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { primary, white, secondary, gray } from "../utils/colors";
import {
  ContainerView,
  ContainerCenterView,
  StackView
} from "../components/ContainerView";
import { TextButton } from "../components/TextButton";
import CreateCardModal from "../components/CreateCardModal";
import { addCard } from "../actions";

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: params.title,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primary
      }
    };
  };

  state = {
    showCreateModal: false,
    currentTag: false
  };

  componentWillMount() {}

  toggleCreateModal = (visible: boolean) => {
    this.setState({ showCreateModal: visible });
  };

  createModalHandle(tag, info) {
    if (tag === "confirm") {
      if (info.text === '' || info.answer === '') {
        return;
      }
      const { deck, index } = this.props.touchDeck;
      deck.cards.push({
        title: info.text,
        answer: info.answer
      });
      this.props.addCard(deck, index);
    }
    this.toggleCreateModal(false);
  }

  doNav() {
    this.props.navigation.navigate("Test", this.props.touchDeck.deck.cards);
  }

  render() {
    const { touchDeck } = this.props;
    return (
      <ContainerView>
        <ContainerCenterView>
          <ContentText>共 {touchDeck.deck.cards.length} 张卡片</ContentText>
          {touchDeck.deck.cards.length === 0 && (
            <TipText>老铁快去新增卡片,新增后可以开始测试</TipText>
          )}
        </ContainerCenterView>
        <StackView>
          {touchDeck.deck.cards.length > 0 && (
            <TextButton
              text="开始测试"
              color={secondary}
              onPress={() => this.doNav()}
            />
          )}
          <TextButton
            text="新增卡片"
            color={primary}
            onPress={() => this.toggleCreateModal(true)}
          />
        </StackView>
        <CreateCardModal
          visible={this.state.showCreateModal}
          buttonTapped={(tag, info) => this.createModalHandle(tag, info)}
        />
      </ContainerView>
    );
  }
}

const ContentText = styled.Text`
  font-size: 40px;
`;
const TipText = styled.Text`
  font-size: 16px;
  color: ${gray};
`;

function mapStateToProps(state) {
  const { touchDeck } = state;
  return {
    touchDeck
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCard: (deck, deckIndex) => dispatch(addCard(deck, deckIndex))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);
