import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import ChangeSessionTime from "./ChangeSessionTime";
import { db, auth, createdAt } from "../firebase";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { handleSessionNotification } from "../utils/notifications.js";
import SessionModal from "./SessionModal";

export default function Session() {
  const focusSessionData = {
    title: "Focus",
    currentDuration: 10,
    durationOptions: ["", 5, 20, 25, 30, 35, 40, 45],
  };
  const breakSessionData = {
    title: "Break",
    currentDuration: 10,
    durationOptions: ["", 5, 10, 15],
  };

  const [isBreak, setIsBreak] = useState(false);
  const [sessionData, setSessionData] = useState(focusSessionData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [counterData, setCounter] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [key, setKey] = useState(0);
  const [remainingTime, setRemainingTime] = useState(
    sessionData.currentDuration
  );
  const [sessionDuration, setSessionDuration] = useState();

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [sessionData]);

  useEffect(() => {
    setSessionData(() => (isBreak ? breakSessionData : focusSessionData));
  }, [isBreak]);

  useEffect(() => {
    const SessionRef = db
      .ref("users")
      .child(auth.currentUser.uid)
      .child(isBreak ? "Break" : "Focus");
    const listener = SessionRef.on(
      "value",
      (snapshot) => {
        const fetchedSessions = [];
        snapshot.forEach((session) => {
          fetchedSessions.push(session.val());
        });
        setCounter(fetchedSessions.length);
      },
      (errorObject) => {
        console.log("The readfailed: " + errorObject);
      }
    );
    return () => SessionRef.off("value", listener);
  }, [db]);

  const handleCompletion = () => {
    console.log("handleCompletion called");
    setIsPlaying(false);
    setModalVisible(true);
    const SessionRef = db
      .ref("users")
      .child(auth.currentUser.uid)
      .child(isBreak ? "Break" : "Focus");

    SessionRef.child(counterData).set({
      sessionNo: counterData,
      time: sessionData.currentDuration,
      timestamp: createdAt,
    });
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
      <ChangeSessionTime
        durationOptions={sessionData.durationOptions}
        setSessionData={setSessionData}
        setKey={setKey}
      />
      <SessionModal
        isBreak={isBreak}
        setIsBreak={setIsBreak}
        setIsPlaying={setIsPlaying}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setSessionData={setSessionData}
        setKey={setKey}
      />

      <TouchableOpacity style={styles.circle} onPress={handlePress}>
        <CountdownCircleTimer
          size={300}
          key={key}
          isPlaying={isPlaying}
          duration={sessionData.currentDuration}
          trailColor={"#22303c"}
          onUpdate={(remainingTime) => setRemainingTime(remainingTime)}
          colors={["#015489", "#008bbe", "#06aac3", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          onComplete={() => {
            handleCompletion();
            setKey((prevKey) => prevKey + 1);
            return;
          }}
        >
          {({ remainingTime }) => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            const paddedSeconds = String(seconds).padStart(2, "0");

            return (
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 40,
                  fontWeight: "bold",
                  marginTop: 5,
                }}
              >{`${minutes}:${paddedSeconds} \n ${sessionData.title}`}</Text>
            );
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
    justifyContent: "space-around",
    paddingBottom: 30,
    backgroundColor: "black",
  },
  changeLength: {
    marginTop: "20%",
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  circle: {
    position: "absolute",
    marginTop: "50%",
    justifyContent: "center",
    alignSelf: "center",
  },
});
