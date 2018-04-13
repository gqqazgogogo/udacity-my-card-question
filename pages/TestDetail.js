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

  // tag: #03 下面第39、132行注释代码，new Animated.Value("0deg")的结果是"0deg0"，
  // 我想知道Animated如何使用类似角度这些单位？
  state = {
    currentIndex: 0,
    rightNum: 0,
    confirmRight: false,
    showResult: false,
    end: false,
    animationInfo: {
      questionOpacity: new Animated.Value(1),
      answerOpacity: new Animated.Value(0),
      // cardRotateY: new Animated.Value("0deg")
    }
  };

  componentWillMount() {}

  confrimAnswer(answer) {
    let { currentIndex, rightNum } = this.state;
    const cards = this.props.navigation.state.params;
    if (cards[currentIndex].answer === answer) {
      rightNum++;
      this.setState({ confirmRight: true, rightNum });
    } else {
      this.setState({ confirmRight: false });
    }
    this.showCardResult(currentIndex);
  }

  showCardResult(currentIndex) {
    const { showAnswer } = this.state;
    if (showAnswer) {
      return;
    }
    const {
      questionOpacity,
      answerOpacity,
      cardRotateY
    } = this.state.animationInfo;
    this.setState({
      showAnswer: true
    });
    // tag: #04 我想实现卡片翻转的动画效果，下面第71、132行注释的代码导致报错: { rotateY: null } 和问题#03相关联
    // Animated.spring(cardRotateY, { toValue: "90deg", friction: 4 }).start();
    Animated.sequence([
      Animated.timing(questionOpacity, { duration: 200, toValue: 0 }),
      Animated.timing(answerOpacity, { duration: 200, toValue: 1 })
    ]).start(({ finished }) => {
      if (finished) {
        setTimeout(() => {
          this.nextQuestion(currentIndex);
        }, 1000);
      }
    });
  }

  nextQuestion(currentIndex) {
    const {
      questionOpacity,
      answerOpacity
      // cardRotateY
    } = this.state.animationInfo;
    const cards = this.props.navigation.state.params;
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      this.setState({
        currentIndex
      });
    } else {
      this.setState({
        end: true
      });
    }
    setTimeout(() => {
      Animated.sequence([
        Animated.timing(answerOpacity, { duration: 200, toValue: 0 }),
        Animated.timing(questionOpacity, { duration: 200, toValue: 1 })
      ]).start(({ finished }) => {
        this.setState({
          showAnswer: false
        });
      });
    }, 0);
  }

  render() {
    const cards = this.props.navigation.state.params;
    const {
      currentIndex,
      animationInfo,
      showResult,
      confirmRight,
      end,
      rightNum
    } = this.state;
    const { questionOpacity, answerOpacity, cardRotateY } = animationInfo;
    return (
      <ContainerView>
        <StepText>
          第{currentIndex + 1}/{cards.length}道题
        </StepText>
        <ContainerCenterViewAnimated
          style={[
            styles.questionCard,
            // { transform: [{ rotateY: cardRotateY }] }
          ]}
        >
          {!showResult && (
            <QuestionTextAnimated style={{ opacity: questionOpacity }}>
              {end
                ? `本次共答对${rightNum}/${cards.length}题,正确率为${(
                    rightNum / cards.length
                  ).toFixed(4) * 100}%`
                : cards[currentIndex].title}
            </QuestionTextAnimated>
          )}
          {confirmRight && (
            <ResultCircle name="circle" style={{ opacity: answerOpacity }} />
          )}
          {!confirmRight && (
            <ResultCross name="cross" style={{ opacity: answerOpacity }} />
          )}
        </ContainerCenterViewAnimated>
        {!end && (
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
        )}
      </ContainerView>
    );
  }
}

const StepText = styled.Text`
  font-size: 18px;
  text-align: center;
`;

const ResultCircle = Animated.createAnimatedComponent(styled(Entypo)`
  font-size: 80px;
  margin: 20px;
  color: ${green};
`);

const ResultCross = Animated.createAnimatedComponent(styled(Entypo)`
  font-size: 120px;
  color: ${red};
`);

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
