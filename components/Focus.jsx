import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { View, Text, TouchableOpacity } from "react-native";
import ChangeFocus from "./ChangeFocus";

export default function Focus({
  setDurationFocus,
  durationFocus,
  startFocus,
  setStartFocus,
  setIsBreak,
}) {
  const handleCompletion = () => {
    setStartFocus(false);
    setIsBreak(true);
  };

  return (
    <View>
      <Text>Focus Screen</Text>
      <ChangeFocus setDurationFocus={setDurationFocus} />
      <TouchableOpacity
        onPress={() =>
          startFocus ? setStartFocus(false) : setStartFocus(true)
        }
      >
        <CountdownCircleTimer
          isPlaying={startFocus}
          duration={durationFocus}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          onComplete={() => handleCompletion()}
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
