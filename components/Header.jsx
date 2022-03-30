import React from "react";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";

function Header({ navigation }) {
  const goHome = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={goHome}>
        <Image
          style={{ width: 30, height: 30 }}
          source={require("../assets/PngItem_4047206.png")}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
});
export default Header;
