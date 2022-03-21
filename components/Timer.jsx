import { Picker } from "@react-native-picker/picker";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useState } from "react";

const ChangeFocus = ({ setDurationFocus }) => {
  const [showLength, setShowLength] = useState(false);
  const minuteArr = [20, 25, 30, 35, 40, 45];

  return (
    <>
      <View>
        <Button
          title="Change focus"
          onPress={() =>
            showLength ? setShowLength(false) : setShowLength(true)
          }
          styles={styles.button}
        ></Button>

        <TouchableOpacity>
          {showLength ? (
            <Picker
              onValueChange={(itemValue) => {
                setShowLength(false);
                setDurationFocus(itemValue * 60);
              }}
            >
              {minuteArr.map((number) => {
                return (
                  <Picker.Item
                    label={`${number}`}
                    value={`${number}`}
                    key={`${number}`}
                  ></Picker.Item>
                );
              })}
            </Picker>
          ) : (
            <Text></Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

const ChangeBreak = ({ setDurationBreak }) => {
  const [showLength, setShowLength] = useState(false);
  const minuteArr = [5, 10, 15];

  return (
    <>
      <View>
        <Button
          title="Change break"
          onPress={() =>
            showLength ? setShowLength(false) : setShowLength(true)
          }
          styles={styles.button}
        ></Button>

        <TouchableOpacity>
          {showLength ? (
            <Picker
              onValueChange={(itemValue) => {
                setShowLength(false);
                setDurationBreak(itemValue * 60);
              }}
            >
              {minuteArr.map((number) => {
                return (
                  <Picker.Item
                    label={`${number}`}
                    value={`${number}`}
                    key={`${number}`}
                  ></Picker.Item>
                );
              })}
            </Picker>
          ) : (
            <Text></Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

const Timer = () => {
  const [durationFocus, setDurationFocus] = useState(10);
  const [isBreak, setIsBreak] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [startBreak, setStartBreak] = useState(false);
  const [durationBreak, setDurationBreak] = useState(5);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "50%",
          backgroundColor: "dodgerblue",
        }}
      >
        <View>
          <TouchableOpacity>
            {isBreak ? (
              <ChangeBreak setDurationBreak={setDurationBreak} />
            ) : (
              <ChangeFocus setDurationFocus={setDurationFocus} />
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

                      return <Text>{`${minutes}:${seconds}`}</Text>;
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

                    return <Text>{`${minutes}:${seconds}`}</Text>;
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
  container: {},
  button: {},
});

export default Timer;
