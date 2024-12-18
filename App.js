import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import MainGameScreen from "./screens/MainGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import EndScreen from "./screens/EndScreen";

export default function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [data, setData] = useState(null);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [totalGeuss, setTotalGeuss] = useState(1);

  function startGame(enteredData) {
    setIsGameStarted(true);
    setData(enteredData);
  }

  function changeGameState(newState) {
    setIsGameStarted(newState);
  }

  function endGame(correctnum) {
    setIsGameStarted(false);
    setData(correctnum);
    setIsGameEnded(true);
  }

  function newGame(newState) {
    setIsGameStarted(newState);
  }

  let screen;
  if (isGameStarted) {
    screen = (
      <MainGameScreen
        data={data}
        changeScreen={changeGameState}
        checkEnd={endGame}
        countGeuss={setTotalGeuss}
      />
    );
  } else if (isGameEnded) {
    screen = <EndScreen endData={data} mainScreen={newGame} total={totalGeuss}/>;
  } else {
    screen = <StartGameScreen changeScreen={startGame} />;
  }

  return (
    <LinearGradient colors={["#FFD194", "#D1913C"]} style={styles.appContainer}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        style={styles.appContainer}
        resizeMode="cover"
        imageStyle={styles.backImg}
      >
        <SafeAreaView style={styles.appContainer}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  backImg: {
    opacity: 0.15
  }
});
