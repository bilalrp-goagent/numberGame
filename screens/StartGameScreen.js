import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useFonts, PatrickHand_400Regular } from '@expo-google-fonts/patrick-hand';
import AppHeader from "../components/AppHeader";
import { useState } from "react";
import color from "../constants/color";
function StartGameScreen({changeScreen}) {
  const regex=/^(?!0$)(?!00$)[a-zA-Z0-9]*$/
  const [enteredInput,setEnteredInput]=useState('')
  function inputHandler(enteredInput){
    setEnteredInput(enteredInput)
  }
  function resetButtonHander(){
    setEnteredInput('')
  }
  function mainButtonHandler(){
    if(enteredInput.trim() !=="")  {
      if(regex.test(enteredInput)){
        changeScreen(parseInt(enteredInput))
      }
      else{
        Alert.alert(
          "Invalid Input", 
          "enter only 1 to 99 no characters allowed", 
          [
            {
              text: "ok", // Button text
              onPress:resetButtonHander, // Action on button press
              style: "cancel", // Button style (optional: "cancel", "destructive", or default)
            },
        
          ],
          { cancelable: true,onDismiss: resetButtonHander} // Optional: Dismiss when tapping outside
        );
      }
    }
  
  }
  const [fontsLoaded] = useFonts({
    PatrickHand_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.gameContainer}>
    <AppHeader>Enter Number</AppHeader>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.gameInput}
          maxLength={2}
          keyboardType="number-pad"
          onChangeText={inputHandler}
          value={enteredInput}
        ></TextInput>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonInnerContainer}>
            <PrimaryButton onPress={mainButtonHandler}>confirm</PrimaryButton>
          </View>
          <View style={styles.buttonInnerContainer}>
            <PrimaryButton onPress={resetButtonHander}>reset</PrimaryButton>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  gameContainer: {
    flex: 1
  },
  
  inputContainer: {
    alignItems: "center",
    marginTop: 100,
    marginHorizontal: 8,
    padding: 16,
    backgroundColor:color.backGroundColor,
    borderRadius: 9,
    elevation: 4
  },
  gameInput: {
    // backgroundColor:'#fde39b',
    marginVertical: 16,
    height: 70,
    width: 50,
    color: "#ebf434",
    // color:"#d5c652",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#a78125",
    fontSize: 40,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: 'PatrickHand_400Regular'
  },
  buttonContainer: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  buttonInnerContainer: {
    flex: 1
  }
});
export default StartGameScreen;
