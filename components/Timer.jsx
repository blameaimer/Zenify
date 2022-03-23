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
import Break from "./Break";
import Focus from "./Focus";

const Timer = () => {
  const [isBreak, setIsBreak] = useState(false);
  const [startFocus, setStartFocus] = useState(false);
  const [startBreak, setStartBreak] = useState(false);
  const [durationFocus, setDurationFocus] = useState(10);
  const [durationBreak, setDurationBreak] = useState(5);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <TouchableOpacity>
            {isBreak ? (
              <Break
                setDurationBreak={setDurationBreak}
                durationBreak={durationBreak}
                setStartBreak={setStartBreak}
                startBreak={startBreak}
                setIsBreak={setIsBreak}
              />
            ) : (
              <Focus
                setDurationFocus={setDurationFocus}
                durationFocus={durationFocus}
                startFocus={startFocus}
                setStartFocus={setStartFocus}
                setIsBreak={setIsBreak}
              />
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
