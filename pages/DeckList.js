// @flow
import React, { Component } from "react";
import styled from "styled-components";
import { FlatList, Platform } from "react-native";
import { connect } from "react-redux";
import { primary, white, secondary } from "../utils/colors";
import {
  ContainerView,
  ContainerCenterView
} from "../components/ContainerView";
import CreateDeckModal from "../components/CreateDeckModal";
import { TextButton } from "../components/TextButton";
import DeckItem from "../components/DeckItem";
import BarItem from "../components/BarItem";
import { addDeck, receiveDecks, touchDeck } from "../actions";
import { getDecks } from "../utils/helpers";

class DeckList extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: "卡片集",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primary
      },
      headerRight: (
        <BarItem text="新建" onPress={() => params.toggleCreateModal(true)} />
      )
    };
  };

  state = {
    showCreateModal: false
  };

  componentWillMount() {
    this.props.navigation.setParams({
      toggleCreateModal: this.toggleCreateModal
    });
    getDecks().then(decks => {
      this.props.receiveDecks(decks);
    });
  }

  toggleCreateModal = (visible: boolean) => {
    this.setState({ showCreateModal: visible });
  };

  createModalHandle(tag, info) {
    if (tag === "confirm") {
      if (info === '') {
        return;
      }
      this.props.addDeck({ title: info, cards: [] });
    }
    this.toggleCreateModal(false);
  }

  doNav(deck, index) {
    this.props.touchDeck(deck, index);
    this.props.navigation.navigate("Detail", deck);
  }

  render() {
    const { decks } = this.props;
    console.log(decks);
    if (decks.length === 0) {
      return (
        <ContainerCenterView>
          <NoneText>老铁你还没有卡片集哦</NoneText>
          <TextButton
            text={"去新建"}
            color={secondary}
            onPress={() => this.toggleCreateModal(true)}
          />
          <CreateDeckModal
            visible={this.state.showCreateModal}
            buttonTapped={(tag, info) => this.createModalHandle(tag, info)}
          />
        </ContainerCenterView>
      );
    }
    return (
      <ContainerView>
        <FlatList
          data={decks}
          keyExtractor={(item ,index) => index}
          renderItem={({ item, index }) => {
            console.log(index);
            return (
              <DeckItem
                title={item.title}
                cards={item.cards}
                onPress={() => {
                  this.doNav(item, index)
                }}
              />
            );
          }}
        />
        <CreateDeckModal
          visible={this.state.showCreateModal}
          buttonTapped={(tag, info) => this.createModalHandle(tag, info)}
        />
      </ContainerView>
    );
  }
}

function mapStateToProps(state) {
  const { decks } = state;
  return {
    decks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: deck => dispatch(addDeck(deck)),
    receiveDecks: decks => dispatch(receiveDecks(decks)),
    touchDeck: (deck, index) => dispatch(touchDeck(deck, index))
  };
}

const NoneText = styled.Text`
  font-size: 20px;
  justify-content: center;
  align-items: center;
`;
const CreateButton = styled.TouchableOpacity`
  background-color: ${secondary};
  align-items: center;
  margin: 80px 0;
  padding: 20px 60px;
  ${Platform.OS === "ios" ? "border-radius: 5px;" : null};
`;
const CreateButtonText = styled.Text`
  color: ${white};
  font-size: 16px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
