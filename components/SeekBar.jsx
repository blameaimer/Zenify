import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text,
    Slider,
    ImageBackground,
  } from "react-native";

const SeekBar = ({
    positionMillis,
    durationMillis,
    sliderValue
  }) => {
    sliderValue = positionMillis/durationMillis
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }} />
          <Text style={[styles.text, { width: 40 }]}>
            {positionMillis + ' / ' + durationMillis}
          </Text>
        </View>
        <Slider

minimumValue={0}
maximumValue={1}
value={sliderValue}
style={styles.slider}
minimumTrackTintColor='#fff'
maximumTrackTintColor='rgba(255, 255, 255, 0.14)'
/>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },})
  export default SeekBar;