import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const SignOutScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("LoginScreen");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View style={styles.container}>
      <View style={styles.infobox}>
        <Text style={styles.text}>
          <Fontisto name="email" color={"white"} size={28} />
          {auth.currentUser?.email}
        </Text>
        <Text style={styles.text}>
          <FontAwesome5 name="user-alt" color={"white"} size={20} />
          {auth.currentUser?.displayName}
        </Text>
      </View>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignOutScreen;

const styles = StyleSheet.create({
  infobox: {
    width: "90%",
    padding: 15,
    backgroundColor: "#181818",
    borderRadius: 15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  text: {
    alignSelf: "center",
    fontSize: 28,
    color: "#b3b3b3",
  },
  input: {
    color: "white",
    backgroundColor: "#8899A6",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    marginTop: 100,
    backgroundColor: "#22303C",
    width: "60%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#8899A6",
    fontWeight: "700",
    fontSize: 16,
  },
});
