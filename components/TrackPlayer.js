import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { trackContext } from "../utils/contexts";
import SeekBar from "./SeekBar";

const audioBookPlaylist = [
  {
    title: "Guided Meditation on the Breath",
    author: "Gil Fronsdal",
    source: "audio dharma",
    uri: "https://www.audiodharma.org/talks/8/download",
    imageSource:
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/4d412b54827733.596dc61650536.gif",
  },
  {
    title: "Guided Body Scan",
    author: "Gil Fronsdal",
    source: "audio dharma",
    uri: "https://www.audiodharma.org/talks/353/download",
    imageSource:
      "https://wallpaperaccess.com/full/1725723.jpg",
  },
  {
    title: "Hamlet - Act III",
    author: "William Shakespeare",
    source: "Librivox",
    uri: "http://www.archive.org/download/hamlet_0911_librivox/hamlet_act3_shakespeare.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
  {
    title: "Hamlet - Act IV",
    author: "William Shakespeare",
    source: "Librivox",
    uri: "https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act4_shakespeare.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
  {
    title: "Guided Meditation on the Breath",
    author: "Gil Fronsdal",
    source: "audio dharma",
    uri: "https://www.audiodharma.org/talks/8/download",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
];

export default function TrackPlayer() {
  // state = {
  //   isPlaying: false,
  //   playbackInstance: null,
  //   // currentIndex: 0,
  //   volume: 1.0,
  //   isBuffering: true,

  // };
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

  let { currentNum, setCurrentIndex } = useContext(trackContext);

  loadAudio = async () => {
    try {
      const playbackInstance = new Audio.Sound();
      const source = {
        uri: audioBookPlaylist[currentNum].uri,
      };

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
  }, []);

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

  handlePreviousTrack = async () => {
    if (playbackInstance && currentNum > 0) {
      await playbackInstance.unloadAsync();
      currentNum < audioBookPlaylist.length - 1
        ? (currentNum -= 1)
        : (currentNum = 0);
      setCurrentIndex(currentNum);
      loadAudio();
    }
  };

  handleNextTrack = async () => {
    if (playbackInstance) {
      try {
        await playbackInstance.unloadAsync();
        currentNum < audioBookPlaylist.length - 1
          ? (currentNum += 1)
          : (currentNum = 0);
        setCurrentIndex(currentNum);
        loadAudio();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const renderFileInfo = () => {
    return playbackInstance ? (
      <View style={styles.trackInfo}>
        <Text style={[styles.trackInfoText, styles.largeText]}>
          {audioBookPlaylist[currentNum].title}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {audioBookPlaylist[currentNum].author}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {audioBookPlaylist[currentNum].source}
        </Text>
      </View>
    ) : null;
  };
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.albumCover}
          resizeMode="cover"
          source={{
            uri: audioBookPlaylist[currentNum].imageSource ,
          }}
        >
          <Image  style={styles.controls} source={{
            uri: "https://icon-library.com/images/loading-icon-transparent-background/loading-icon-transparent-background-12.jpg",
          }} />
          
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.albumCover}
        resizeMode="cover"
        source={{
          uri: audioBookPlaylist[currentNum].imageSource,
        }}
      >
        {renderFileInfo()}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.control}
            onPress={handlePreviousTrack}
          >
            <Ionicons name="ios-play-skip-back-circle" size={48} color="#444" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={handlePlayPause}>
            {isPlaying ? (
              <Ionicons name="ios-pause" size={48} color="#444" />
            ) : (
              <Ionicons name="ios-play-circle" size={48} color="#444" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={handleNextTrack}>
            <Ionicons
              name="ios-play-skip-forward-circle"
              size={48}
              color="#444"
            />
          </TouchableOpacity>
          <SeekBar
            durationMillis={durationMillis}
            positionMillis={positionMillis}
            sliderValue={sliderValue}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  albumCover: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
  trackInfo: {
    padding: 5,
    color: "white",
    backgroundColor: "rgba(52, 52, 52, 0.2)",
    alignSelf: "center",
    padding: 5,
    opacity: 1,
    borderRadius: 10,
    marginTop: "0%",
  },

  trackInfoText: {
    textAlign: "center",

    flexWrap: "wrap",
    color: "white",
  },
  largeText: {
    fontSize: 22,
  },
  smallText: {
    fontSize: 16,
  },
  control: {
    margin: 40,
    paddingTop: 90,
  },
  controls: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 40,
  },
});
