import {
  Modal,
  View,
  Text,
  Pressable,
  Alert,
  StyleSheet,
  TouchableOpacity,
  BlurView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

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
      {/* <BlurView style={styles.cardContainer} blurType="light" blurAmount={20}> */}
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
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Feather name="x-circle" color={"white"} size={25} />
            </TouchableOpacity>
            <Text style={styles.modalText}>
              {isBreak ? "Get Back to Work!" : "Time for a Break!"}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose, styles.topButton]}
              onPress={() => {
                setIsBreak((isBreak) => !isBreak);
                setIsPlaying(true);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.topButton}>
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
            {isBreak ? (
              <Text></Text>
            ) : (
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setSessionData((currentSession) => {
                    return { ...currentSession, currentDuration: 5 };
                  });
                  //  currentDuration: 5 * 60

                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Skip Break</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
      {/* </BlurView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    marginTop: "50%",
    width: "75%",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  modalView: {
    marginTop: 40,
    backgroundColor: "#282828",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    paddingBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    marginBottom: 15,
    height: 35,
    padding: 5,
    elevation: 2,
    backgroundColor: "#242526",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignContent: "stretch",
    width: "60%",
  },
  topButton: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    margin: 2,
    fontSize: 15,
    backgroundColor: "#008bbe",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#242526",
    borderColor: "#008bbe",
    borderWidth: 1,
  },
  textStyle: {
    color: "#008bbe",
    fontWeight: "bold",
    textAlign: "center",
    margin: 2,
    fontSize: 15,
  },
  modalText: {
    flexWrap: "nowrap",
    marginBottom: "20%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "#008bbe",
  },
  closeButton: {
    marginBottom: 5,
    alignSelf: "flex-end",
  },
  // cardContainer: {
  //   blurType
  // }
});
