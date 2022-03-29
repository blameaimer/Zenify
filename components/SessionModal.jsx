import { Modal, View, Text, Pressable, Alert, StyleSheet } from "react-native";

export default function SessionModal({
  isBreak,
  setIsBreak,
  setIsPlaying,
  modalVisible,
  setModalVisible,
  setSessionData,
  setKey,
}) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {isBreak ? "Get Back to Work!" : "Time for a Break!"}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setIsBreak((isBreak) => !isBreak);
                setIsPlaying(true);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>
                {isBreak ? "Start Focus" : "Start Break"}
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setSessionData((currentSession) => {
                  setKey((prevKey) => prevKey + 1);
                  return {
                    ...currentSession,
                    currentDuration: 5,
                  };
                });

                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>+5 min</Text>
            </Pressable>

            {isBreak ? (
              <Text></Text>
            ) : (
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setSessionData((currentSession) => {
                    // console.log(currentSession);
                    return { ...currentSession, currentDuration: 5 };
                  });
                  //  currentDuration: 5 * 60

                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Skip Break</Text>
              </Pressable>
            )}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setIsBreak((isBreak) => !isBreak);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>
                {isBreak ? "Finish Break" : "Finish Session"}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
