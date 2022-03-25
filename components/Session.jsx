import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ChangeSessionTime from "./ChangeSessionTime";
import { useEffect, useState } from "react";
import { sendNotification } from "../utils/notifications.js";

export default function Session() {
  const focusSessionData = {
    title: "Focus",
    currentDuration: 10,
    durationOptions: ["", 20, 25, 30, 35, 40, 45],
  };
  const breakSessionData = {
    title: "Break",
    currentDuration: 20,
    durationOptions: ["", 5, 10, 15],
  };

  const [isBreak, setIsBreak] = useState(false);
  const [sessionData, setSessionData] = useState(focusSessionData);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCompletion = async () => {
    setIsPlaying(false);
    setIsBreak((isBreak) => !isBreak);
    await sendNotification(
      `${sessionData.title} session over`,
      "You're doing great!"
    );
  };

  useEffect(() => {
    setSessionData(() => (isBreak ? breakSessionData : focusSessionData));
  }, [isBreak]);

  return (
    <View style={styles.container}>
      <Text>{sessionData.title}</Text>
      <ChangeSessionTime
        durationOptions={sessionData.durationOptions}
        setSessionData={setSessionData}
      />

      <TouchableOpacity onPress={() => setIsPlaying((isPlaying) => !isPlaying)}>
        <CountdownCircleTimer
          key={sessionData.currentDuration}
          isPlaying={isPlaying}
          duration={sessionData.currentDuration}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
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
});
