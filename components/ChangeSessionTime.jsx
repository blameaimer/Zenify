import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function ChangeSessionTime({ durationOptions, setSessionData }) {
  const [showLength, setShowLength] = useState(false);

  return (
    <>
      <View>
        <TouchableOpacity
          onPress={() =>
            showLength ? setShowLength(false) : setShowLength(true)
          }
        >
          <Text style={styles.changeLength}>Set Length</Text>
        </TouchableOpacity>
        {showLength ? (
          <Picker
            style={{ backgroundColor: "white" }}
            onValueChange={(itemValue) => {
              setShowLength(false);
              setSessionData((currentSession) => {
                return { ...currentSession, currentDuration: itemValue * 60 };
              });
            }}
          >
            {durationOptions.map((number) => {
              return (
                <Picker.Item
                  label={`${number}`}
                  value={`${number}`}
                  key={`${number}`}
                ></Picker.Item>
              );
            })}
          </Picker>
        ) : (
          <Text></Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  changeLength: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 5,
  },
});
