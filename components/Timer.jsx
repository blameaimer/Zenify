import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useState } from "react";
import ChangeBreak from "./ChangeBreak";
import ChangeFocus from "./ChangeFocus";

const Timer = () => {
  const [durationFocus, setDurationFocus] = useState(10);
  const [isBreak, setIsBreak] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [startBreak, setStartBreak] = useState(false);
  const [durationBreak, setDurationBreak] = useState(5);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <TouchableOpacity>
            {isBreak ? (
              <>
                <Text>Break Screen</Text>
                <ChangeBreak setDurationBreak={setDurationBreak} />
              </>
            ) : (
              <>
                <Text>Focus Screen</Text>
                <ChangeFocus setDurationFocus={setDurationFocus} />
              </>
            )}
            {isBreak ? (
              <TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    startBreak ? setStartBreak(false) : setStartBreak(true)
                  }
                >
                  <CountdownCircleTimer
                    isPlaying={startBreak}
                    duration={durationBreak}
                    colors={"#F7B801"}
                    onComplete={() => {
                      setStartBreak(false);
                      setIsBreak(false);
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
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => (playing ? setPlaying(false) : setPlaying(true))}
              >
                <CountdownCircleTimer
                  isPlaying={playing}
                  duration={durationFocus}
                  colors={"#F7B801"}
                  onComplete={() => {
                    setPlaying(false);
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
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

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

export default Timer;
