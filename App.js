import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Timer from "./components/Timer";
import CreateTasksScreen from "./components/CreateTasksScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <CreateTasksScreen />
      <Timer />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})