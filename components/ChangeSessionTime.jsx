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
          <Text style={styles.changelength}>Set Length</Text>
        </TouchableOpacity>
        {showLength ? (
          <Picker
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
  changelength: {
    fontSize: 32,
    textAlign: "center",
  },
});
