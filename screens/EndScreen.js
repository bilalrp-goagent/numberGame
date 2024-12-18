import { View, Text, StyleSheet, Button } from "react-native";
import AppHeader from "../components/AppHeader";

function EndScreen({ endData, mainScreen, total }) {
  return (
    <View style={styles.endScreen}>
      <AppHeader>Your Guess is: {endData}</AppHeader>
      <Button title="New Game" onPress={() => {mainScreen(false)}} />
    </View>
  );
}

const styles = StyleSheet.create({
  endScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  }
});

export default EndScreen;
