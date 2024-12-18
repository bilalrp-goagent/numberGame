import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  useFonts,
  PatrickHand_400Regular
} from "@expo-google-fonts/patrick-hand";

function PrimaryButton({ children,onPress}) {
  const [fontsLoaded] = useFonts({
    PatrickHand_400Regular
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  function pressHandler() {
      onPress();
  }

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={pressHandler}
        android_ripple={{ color: "#fcd25f" }}
      >
        <Text style={styles.ButtonText}>{children}</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 25,
    margin: 4,
    overflow: "hidden"
  },
  buttonInnerContainer: {
    backgroundColor: "#fde39b",
    // backgroundColor: '#fde39b',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  ButtonText: {
    fontSize: 18,
    fontWeight: "semibold",
    color: "#f5b505",
    textAlign: "center",
    fontFamily: "PatrickHand_400Regular"
  },
  pressed: {
    opacity: 0.75
  }
});
export default PrimaryButton;
