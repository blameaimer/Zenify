import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ChangeSessionTime({
  durationOptions,
  setSessionData,
  setKey,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View>
        <View style={styles.lengthbox}>
          <TouchableOpacity
            onPress={() => setModalVisible((modalVisible) => !modalVisible)}
          >
            <Text style={styles.changeLength}>
              Set Length{" "}
              <Ionicons
                name="ios-stopwatch-outline"
                color={"white"}
                size={24}
              />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: "50%", alignSelf: "center", bottom: 0 }}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <Picker
              // style={{ }}
              itemStyle={{
                backgroundColor: "black",
                color: "white",
                fontSize: 27,
              }}
              onValueChange={(itemValue) => {
                setKey((prevKey) => prevKey + 1);
                setSessionData((currentSession) => {
                  return { ...currentSession, currentDuration: itemValue };
                });
                setModalVisible(false);
              }}
            >
              {durationOptions.map((number) => {
                return (
                  <Picker.Item
                    label={`${number}`}
                    value={number}
                    key={`${number}`}
                  ></Picker.Item>
                );
              })}
            </Picker>
          </Modal>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  changeLength: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5,
    flexDirection: "row",
    width: "100%",
  },
  lengthbox: {
    justifyContent: "center",
    alignItems: "center",
    margin: "10%",
    width: "60%",
    padding: 15,
  },
});
