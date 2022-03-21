import { useCountdown } from "react-native-countdown-circle-timer";

import { Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import { useState } from "react";
// {
//     path,
//     pathLength,
//     stroke,
//     strokeDashoffset,
//     remainingTime,
//     elapsedTime,
//     size,
//     strokeWidth,
//   } = useCountdown({ isPlaying: true, duration: 7, colors: "#abc" })

const Timer = () => {
  const [pressed, setPressed] = useState(false);
  const [duration, setDuration] = useState(1500);

  return (
    <>
      <TouchableOpacity
        onPress={() => (pressed ? setPressed(false) : setPressed(true))}
      >
        <CountdownCircleTimer
          isPlaying={pressed}
          duration={duration}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
        >
          {({ remainingTime }) => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;

            return <Text>{`${minutes}:${seconds}`}</Text>;
          }}
        </CountdownCircleTimer>
      </TouchableOpacity>
    </>
  );
};

export default Timer;
