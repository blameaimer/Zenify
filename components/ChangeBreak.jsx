import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

export default function ChangeBreak({ setDurationBreak }) {
  const [showLength, setShowLength] = useState(false);
  const minuteArr = ["break length", 5, 10, 15];

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
                setDurationBreak(itemValue * 60);
              }}
            >
              {minuteArr.slice(1).map((number) => {
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
  },
});
