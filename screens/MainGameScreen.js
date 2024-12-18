import { View, StyleSheet, Text, Button, Alert, FlatList } from "react-native";
import AppHeader from "../components/AppHeader";
import PrimaryButton from "../components/PrimaryButton";
import { useState, useCallback } from "react";
import Number from "../components/Number";
import color from "../constants/color";

// Updated function to avoid infinite recursion
function generateRandomBetween(min, max, exclude) {
  const maxRetries = 10; // Limit the number of retries
  let retries = 0;
  let rndNum = Math.floor(Math.random() * (max - min)) + min;
  
  while (rndNum === exclude && retries < maxRetries) {
    retries++;
    rndNum = Math.floor(Math.random() * (max - min)) + min;
  }

  // If we reached max retries, return a different number (fallback)
  if (rndNum === exclude) {
    return rndNum === min ? max : min; // Just return an edge value to avoid infinite loop
  }

  return rndNum;
}

function MainGameScreen({ data, changeScreen, checkEnd }) {
  const [boundaries, setBoundaries] = useState({ min: 1, max: 100 });
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(boundaries.min, boundaries.max, data));
  const [operationList, setOperationList] = useState([]);
  const [totalGuesses, setTotalGuesses] = useState(0);

  // Function to handle new guess based on direction
  const guessNewNumber = useCallback((direction) => {
    if (
      (direction === "lower" && data > currentGuess) ||
      (direction === "greater" && data < currentGuess)
    ) {
      Alert.alert(
        "Liar!",
        "You know this is incorrect!",
        [{ text: "Sorry!", style: "cancel" }],
        { cancelable: true }
      );
      return;
    }

    // Update boundaries and the current guess
    let newMin = boundaries.min;
    let newMax = boundaries.max;

    if (direction === "lower") {
      newMax = currentGuess;
    } else {
      newMin = currentGuess + 1;
    }

    // Check if the boundaries are not narrowed down too much
    if (newMin >= newMax) {
      Alert.alert("No more guesses", "The boundaries are too narrow.");
      return;
    }

    setBoundaries({ min: newMin, max: newMax });
    const newGuess = generateRandomBetween(newMin, newMax, currentGuess);

    setCurrentGuess(newGuess);
    setOperationList((prevList) => [...prevList, `${newMin} - ${newMax}`]);
    setTotalGuesses((prev) => prev + 1); // Increment the total guess count
  }, [currentGuess, data, boundaries]);

  // If the guess matches the target number, end the game
  if (currentGuess === data) {
    checkEnd(data);
  }

  return (
    <View style={styles.screen}>
      <AppHeader>Opponent's Guess</AppHeader>
      <Number number={currentGuess} />
      <View style={styles.inputContainer}>
        <Text style={styles.instructionText}>Higher or Lower?</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonInnerContainer}>
            <PrimaryButton onPress={() => guessNewNumber("lower")}>-</PrimaryButton>
          </View>
          <View style={styles.buttonInnerContainer}>
            <PrimaryButton onPress={() => guessNewNumber("greater")}>+</PrimaryButton>
          </View>
        </View>
      </View>

      <View>
        <Button
          title="Back"
          onPress={() => {
            changeScreen(false);
          }}
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Operations History:</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={operationList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>{`Your number was between ${item}`}</Text>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    alignItems: "center"
  },
  inputContainer: {
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 8,
    padding: 16,
    backgroundColor: "#f5b505",
    borderRadius: 9,
    elevation: 4
  },
  instructionText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "600"
  },
  buttonContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10
  },
  buttonInnerContainer: {
    flex: 1,
    marginHorizontal: 5
  },
  listContainer: {
    flex: 1,
    width: "100%",
    marginTop: 20
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  listItem: {
    fontSize: 16,
    margin: 7,
    padding: 10,
    paddingLeft: 20,
    color: "#fff",
    backgroundColor: color.backGroundColor,
    borderRadius: 15,
    elevation: 3
  }
});

export default MainGameScreen;
