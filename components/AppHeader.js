import { View,Text,StyleSheet} from "react-native";


function AppHeader({children}){
    return(
        <View style={styles.textContainer}>
        <Text style={styles.titleText}>{children}</Text>
      </View>
    )
}

const styles=StyleSheet.create({
textContainer: {
    borderRadius:5,
    marginTop: 45,
    marginHorizontal:16,
    width: "90%",
    height: 75,
    borderWidth: 4,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    color: "#ebf434",
    fontSize: 35,
    padding:7,
    fontFamily: 'PatrickHand_400Regular',
    textAlign:'center'
    
  }
});
export default AppHeader;