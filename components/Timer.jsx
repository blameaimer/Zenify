import { Picker } from "@react-native-picker/picker";
import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityComponent,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useState } from "react";
import {
  useDimensions,
  useDeviceOrientation,
} from "@react-native-community/hooks";

const ChangeLength = ({ setDuration }) => {
  const [selectedDuration, setSelectedDuration] = useState();
  const [showLength, setShowLength] = useState(false);
  const minuteArr = [20, 25, 30, 35, 40, 45];

  return (
    <>
      <View>
        <Button
          title="Change time"
          onPress={() =>
            showLength ? setShowLength(false) : setShowLength(true)
          }
          styles={styles.button}
        ></Button>

        <TouchableOpacity>
          {showLength ? (
            <Picker
              selectedValue={selectedDuration}
              onValueChange={(itemValue) => {
                setShowLength(false);
                setDuration(itemValue * 60);
                setSelectedDuration(itemValue);
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

// const Break = () => {
//   const [duration, setDuration] = useState(5);
//   const [playing, setPlaying] = useState(false);

//   return (

//   );
// };

// const Focus = ({ setIsBreak }) => {
//   const [playing, setPlaying] = useState(false);
//   const [duration, setDuration] = useState(10);

//   return (

//   );
// };

const Timer = () => {
  const [duration, setDuration] = useState(10);
  const [isBreak, setIsBreak] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [startBreak, setStartBreak] = useState(false);

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
            <ChangeLength setDuration={setDuration} />
            {isBreak ? (
              <TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    startBreak ? setStartBreak(false) : setStartBreak(true)
                  }
                >
                  <CountdownCircleTimer
                    isPlaying={startBreak}
                    duration={5}
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
                  duration={duration}
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
