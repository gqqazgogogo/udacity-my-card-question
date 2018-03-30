// @flow
import React, { Component } from "react";
import styled from "styled-components";
import { Platform, StyleSheet, Animated } from "react-native";
import { connect } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { primary, white, gray, red, green } from "../utils/colors";
import {
  ContainerView,
  ContainerCenterView,
  StackView
} from "../components/ContainerView";
import { TextButtonLight } from "../components/TextButton";
import { addCard } from "../actions";

class TestDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    // const params = navigation.state.params || {};
    return {
      title: "卡片集测试",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primary
      }
    };
  };

  state = {
    currentIndex: 0,
    rightNum: 0,
    showResult: false,
    end: false,
    animationInfo: {
      questionOpacity: new Animated.Value(1),
      answerOpacity: new Animated.Value(0),
      // cardRotateY: new Animated.Value('0deg')
    }
  };

  componentWillMount() {}

  confrimAnswer(answer) {
    let { currentIndex, rightNum } = this.state;
    const cards = this.props.navigation.state.params;
    if (cards[currentIndex].answer === answer) {
      rightNum++;
    }
    currentIndex++;
    if (currentIndex === cards.length) {
      this.showCardResult();
      this.setState({
        rightNum,
        end: true
      });
    } else {
      this.showCardResult(currentIndex);
      this.setState({
        rightNum
      });
    }
  }

  showCardResult(currentIndex) {
    const { animationInfo } = this.state;
    const { questionOpacity, answerOpacity, cardRotateY } = animationInfo;
    Animated.spring(cardRotateY, { toValue: "90deg", friction: 4 }).start();
    Animated.timing(questionOpacity, { duration: 100, toValue: 0 }).start(
      ({ finished }) => {
        if (finished) {
          this.setState({
            showResult: true
          });
          Animated.timing(answerOpacity, { duration: 100, toValue: 1 }).start();
        }
      }
    );
  }

  showCardQuestion() {}

  nextQuestion(nextIndex) {}

  render() {
    const cards = this.props.navigation.state.params;
    const { currentIndex, animationInfo, showResult } = this.state;
    const { questionOpacity, answerOpacity, cardRotateY } = animationInfo;
    return (
      <ContainerView>
        <StepText>
          第{currentIndex + 1}/{cards.length}道题
        </StepText>
        <ContainerCenterViewAnimated
          style={[
            styles.questionCard,
            { transform: [{ rotateY: cardRotateY }] }
          ]}
        >
          {!showResult && (
            <QuestionTextAnimated style={{ opacity: questionOpacity }}>
              {cards[currentIndex].title}
            </QuestionTextAnimated>
          )}
          {showResult && (
            <Entypo name="circle" color={green} style={[styles.answerResult]} />
          )}
          {showResult && (
            <Entypo name="cross" color={red} style={[styles.answerResult]} />
          )}
        </ContainerCenterViewAnimated>
        <StackView>
          <TextButtonLight
            text="错误"
            color={red}
            onPress={() => this.confrimAnswer(false)}
          />
          <TextButtonLight
            text="正确"
            color={green}
            onPress={() => this.confrimAnswer(true)}
          />
        </StackView>
      </ContainerView>
    );
  }
}

const StepText = styled.Text`
  font-size: 18px;
  text-align: center;
`;
const ContainerCenterViewAnimated = Animated.createAnimatedComponent(
  ContainerCenterView
);
const QuestionTextAnimated = Animated.createAnimatedComponent(styled.Text`
  font-size: 40px;
`);

const styles = StyleSheet.create({
  questionCard: {
    backgroundColor: white,
    borderRadius: 10,
    margin: 12,
    shadowRadius: 3,
    shadowOpacity: 0.4,
    shadowColor: gray,
    shadowOffset: {
      width: 2,
      height: 2
    }
  },
  answerResult: {
    fontSize: 120
  }
});

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

export default connect(mapStateToProps, mapDispatchToProps)(TestDetail);
