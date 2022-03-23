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
          colors={"#F7B801"}
          onComplete={() => {
            setStartFocus(false);
            setIsBreak(true);
          }}
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
