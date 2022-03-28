import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import ChangeSessionTime from "./ChangeSessionTime";
import { useEffect, useState } from "react";
import { handleSessionNotification } from "../utils/notifications.js";

export default function Session() {
  const focusSessionData = {
    title: "Focus",
    currentDuration: 10,
    durationOptions: ["", 0.08, 20, 25, 30, 35, 40, 45],
  };
  const breakSessionData = {
    title: "Break",
    currentDuration: 20,
    durationOptions: ["", 0.08, 5, 10, 15],
  };

  const [isBreak, setIsBreak] = useState(false);
  const [sessionData, setSessionData] = useState(focusSessionData);
  const [isPlaying, setIsPlaying] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [remainingTime, setRemainingTime] = useState(
    sessionData.currentDuration
  );

  useEffect(() => {
    setSessionData(() => (isBreak ? breakSessionData : focusSessionData));
  }, [isBreak]);


  const handleCompletion = async () => {
    setModalVisible(true);
    setIsPlaying(false);


    await sendNotification(
      `${sessionData.title} session over`,
      "You're doing great!"
    );
  };
  useEffect(() => {
    setSessionData(() => (isBreak ? breakSessionData : focusSessionData));
  }, [isBreak]);

    setIsBreak(!isBreak);
  };

  const notificationContent = {
    remainingTime: remainingTime,
    title: `${sessionData.title} session over`,
    body: "You're doing great!",
  };

  const handlePress = async () => {
    await handleSessionNotification(isPlaying, notificationContent);
    setIsPlaying(!isPlaying);
  };


  return (
    <View style={styles.container}>
      <Text>{sessionData.title}</Text>
      <ChangeSessionTime
        durationOptions={sessionData.durationOptions}
        setSessionData={setSessionData}
      />
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
                    return { ...currentSession, currentDuration: 5 };
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
                      return { ...currentSession, currentDuration: 5 * 60 };
                    });

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

      <TouchableOpacity onPress={handlePress}>
        <CountdownCircleTimer
          key={sessionData.currentDuration}
          isPlaying={isPlaying}
          duration={sessionData.currentDuration}
          trailColor={"blue"}
          rotation={"counterclockwise"}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          onUpdate={(remainingTime) => setRemainingTime(remainingTime)}
          onComplete={handleCompletion}
        >
          {({ remainingTime }) => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            const paddedSeconds = String(seconds).padStart(2, "0");

            return <Text>{`${minutes}:${paddedSeconds}`}</Text>;
          }}
        </CountdownCircleTimer>
      </TouchableOpacity>
    </View>
  );
}

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
