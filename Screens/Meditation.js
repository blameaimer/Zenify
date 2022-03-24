import React, { useState } from "react";
import { StyleSheet, Switch, View, Text, TouchableOpacity } from "react-native";

function Meditation({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.switch}>
        <Text> {isEnabled ? "title1" : "title2"}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#ffff"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View>
        {isEnabled ? (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("TrackPlayer")}
            >
              <Text>body1</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text>body2</Text>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  switch: {
    alignSelf: "flex-start",
  },
});
export default Meditation;
