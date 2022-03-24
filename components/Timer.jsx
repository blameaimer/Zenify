import { SafeAreaView, View, TouchableOpacity, StyleSheet } from "react-native";
import Session from "./Session";

const Timer = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <TouchableOpacity>
            <Session />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "50%",
    backgroundColor: "dodgerblue",
  },
  button: {},
});

export default Timer;
