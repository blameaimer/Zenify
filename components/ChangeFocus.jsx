import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function ChangeFocus({ setDurationFocus }) {
  const [showLength, setShowLength] = useState(false);
  const minuteArr = [20, 25, 30, 35, 40, 45];

  return (
    <>
      <View>
        <TouchableOpacity
          onPress={() =>
            showLength ? setShowLength(false) : setShowLength(true)
          }
        >
          <Text style={styles.changelength}>Set Length</Text>
          {showLength ? (
            <Picker
              onValueChange={(itemValue) => {
                setShowLength(false);
                setDurationFocus(itemValue * 60);
              }}
            >
              {minuteArr.map((number) => {
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
        </TouchableOpacity>
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
