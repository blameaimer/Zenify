
import React, { useState, useContext,useLayoutEffect } from "react";
import {
  StyleSheet,
  Switch,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  SectionList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import SwitchSelector from "react-native-switch-selector";
import { trackContext } from "../utils/contexts";

const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );
};
function Unguided(props) {
    const [isPlaying, setIsPLaying] = useState(false);
    const [playbackInstance, setPlaybackInstance] = useState(null);
    const [volume, setVolume] = useState(1.0);
    const [isBuffering, setIsBuffering] = useState(true);
    const [durationMillis, setDurationMillis] = useState(1);
    const [positionMillis, setPositionMillis] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [paused, setPaused] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState(null);
  
    loadAudio = async () => {
      try {
        const playbackInstance = new Audio.Sound();
        const source = {
          uri: `https://moodly.site/sounds/${name}.mp3`,
        };
        console.log(source)
        const status = {
          shouldPlay: isPlaying,
          volume: volume,
        };
  
        playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        await playbackInstance.loadAsync(source, status, false);
        setPlaybackInstance(playbackInstance);
        setSliderValue(positionMillis / durationMillis);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
  
    useLayoutEffect(() => {
      try {
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          shouldDuckAndroid: true,
          staysActiveInBackground: true,
          playThroughEarpieceAndroid: true,
        });
  
        loadAudio();
      } catch (e) {
        console.log(e);
      }
    }, [name]);
  
    onPlaybackStatusUpdate = (status) => {
      setIsBuffering(status.isBuffering);
      setDurationMillis(status.durationMillis);
      setPositionMillis(status.positionMillis);
    };
  
    handlePlayPause = async () => {
      isPlaying
        ? await playbackInstance.pauseAsync()
        : await playbackInstance.playAsync();
  
      setIsPLaying((currentPlay) => !currentPlay);
    };
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderItem={({ item, section }) => {
            if (section.horizontal) {
              return null;
            }
            return                    <TouchableOpacity
            onPress={() => {
              setName(item.text.toLowerCase())
               handlePlayPause()
            }}
          >
            <ListItem item={item} />
          </TouchableOpacity>;
          }}
        />
        </SafeAreaView>
    );
}

const SECTIONS = [
    {
      title: "Sounds",
      horizontal: false,
      data: [
        {
          key: "1",
          text: "Lightning",
          uri: "https://cdn.dribbble.com/users/518045/screenshots/11604863/media/c6e2755cd5a30fecda85c2171b34b342.png",
        },
        {
          key: "2",
          text: "Rain",
          uri: "https://cdn.dribbble.com/users/63407/screenshots/7009071/media/4a5f94e5556a5772d3992f16a7355216.png",
        },
  
        {
          key: "3",
          text: "Snow",
          uri: "https://ak.picdn.net/shutterstock/videos/1058415691/thumb/1.jpg",
        },
        {
          key: "4",
          text: "CampFire",
          uri: "https://i.pinimg.com/originals/80/7d/1c/807d1c70e775ca8bd3dc6717febd11f0.jpg",
        },
        {
          key: "5",
          text: "Birds",
          uri: "https://www.pixel4k.com/wp-content/uploads/2018/03/Wallpaper%20forest,%20mountains,%20violet,%20birds,%20art,%20HD,%20Abstract%20668473088.jpg",
        },
      ],
    },
  ];

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: "black",
    },
    switch: {
      alignSelf: "flex-start",
      alignItems: "center",
      width: "60%",
      marginTop: "5%",
      marginLeft: "10%",
      position: "absolute",
      fontWeight: "bold",
    },
    content: {
      width: "100%",
      marginTop: "30%",
      alignSelf: "center",
      padding: "0%",
    },
    sectionHeader: {
      fontWeight: "800",
      fontSize: 18,
      color: "#f4f4f4",
      marginTop: 10,
      // marginBottom: 5,
    },
    item: {
      margin: 10,
      width:"100%"
    },
    itemPhoto: {
      width: "100%",
      height: 200,
      borderRadius: 10,
    },
    itemText: {
      color: "white",
      marginTop: 5,
    },
  });

export default Unguided;

