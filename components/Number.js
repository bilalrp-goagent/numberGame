import { View, Text, StyleSheet } from "react-native";
import color from "../constants/color";
import { useFonts, PatrickHand_400Regular } from '@expo-google-fonts/patrick-hand';

function Number({ number }) {
     useFonts({
        PatrickHand_400Regular,
      });
  return (
    <View style={styles.numberContainer}>
      <Text style={styles.numberText}>{number}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    numberContainer:{
        margin:25,
        width:'70%',
        height:150,
        backgroundColor:color.trasparentBackground,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:9,
    },
    numberText:{
        fontFamily:'PatrickHand_400Regular',
        color:color.textColor,
        fontSize:58,
        fontWeight:'400'
    }
});
export default Number;
