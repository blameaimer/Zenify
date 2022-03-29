import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import ChangeSessionTime from "./ChangeSessionTime";
import { db, auth } from "../firebase";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { handleSessionNotification } from "../utils/notifications.js";
import SessionModal from "./SessionModal";

export default function Session() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const userName = auth.currentUser?.displayName;
    const taskRef = db.ref("users").child(userName).child("tasks");
    const listener = taskRef.orderByChild("index").on(
      "value",
      (snapshot) => {
        const fetchedTasks = [];
        snapshot.forEach((task) => {
          fetchedTasks.push(task);
        });
        setTasks(fetchedTasks);
      },
      (errorObject) => {
        console.log("The readfailed: " + errorObject);
      }
    );
    return () => taskRef.off("value", listener);
  }, [db]);

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
  const [counterData, setCounter] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [key, setKey] = useState(0);
  const [remainingTime, setRemainingTime] = useState(
    sessionData.currentDuration
  );

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [sessionData]);

  useEffect(() => {
    setSessionData(() => (isBreak ? breakSessionData : focusSessionData));
  }, [isBreak]);

  useEffect(() => {
    const userName = auth.currentUser?.displayName;
    const SessionRef = db
      .ref("users")
      .child(userName)
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
    setModalVisible(true);
    setIsPlaying(false);
    const userName = auth.currentUser?.displayName;
    const SessionRef = db
      .ref("users")
      .child(userName)
      .child(isBreak ? "Break" : "Focus");

    SessionRef.child(counterData).set({
      sessionNo: counterData,
      time: sessionData.currentDuration,
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

      <TouchableOpacity onPress={handlePress}>
        <CountdownCircleTimer
          style={styles.circle}
          size={300}
          key={key}
          isPlaying={isPlaying}
          duration={sessionData.currentDuration}
          trailColor={"#22303c"}
          onUpdate={(remainingTime) => setRemainingTime(remainingTime)}
          colors={["#015489", "#008bbe", "#06aac3", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          onComplete={handleCompletion}
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
    justifyContent: "space-between",
    paddingBottom: 30,
    backgroundColor: "#181818",
  },
  changeLength: { color: "white", fontSize: 40, fontWeight: "bold" },
});
