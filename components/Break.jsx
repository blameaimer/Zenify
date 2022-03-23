import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { View, Text, TouchableOpacity } from "react-native";
import ChangeBreak from "./ChangeBreak";

export default function Break({
  setDurationBreak,
  durationBreak,
  setStartBreak,
  startBreak,
  setIsBreak,
}) {
  const handleCompletion = () => {
    setStartBreak(false);
    setIsBreak(false);
  };

  return (
    <View>
      <Text>Break Screen</Text>
      <ChangeBreak setDurationBreak={setDurationBreak} />
      <TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            startBreak ? setStartBreak(false) : setStartBreak(true)
          }
        >
          <CountdownCircleTimer
            isPlaying={startBreak}
            duration={durationBreak}
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
      </TouchableOpacity>
    </View>
  );
}
