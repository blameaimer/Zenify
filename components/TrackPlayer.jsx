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
    title: "Wonderful Happiness",
    author: "Fransico Morillo Gable",
    source: "audio dharma",
    uri: "https://www.audiodharma.org/talks/13845/download",
    imageSource:
      "https://wallpaperboat.com/wp-content/uploads/2019/08/Firewatch-Wallpaper-For-Your-Iphone-1280-1024.jpg",
  },
  {
    title: "Mindfulness of Thinking",
    author: "Ines Freedman",
    source: "audio dharma",
    uri: "https://www.audiodharma.org/talks/1777/download",
    imageSource:
      "https://wallpapercave.com/wp/wp6827255.jpg",
  },
  {
    title: "Receptive Mindfulness",
    author: "Andrea Fella",
    source: "audio dharma",
    uri: "https://www.audiodharma.org/talks/14876/download",
    imageSource:
      "https://c4.wallpaperflare.com/wallpaper/772/265/137/2d-flat-nature-mountain-top-hd-wallpaper-preview.jpg",
  },
    {
    title: "Guided Meditation: Balancing Through Mindfulness",
    author: "Kim Allen",
    source: "audio dharma",
    uri: "https://www.audiodharma.org/talks/15274/download",
    imageSource:
    "https://media.idownloadblog.com/wp-content/uploads/2020/10/iOS-14.2-wallpaper-LAke-The-Beach-Light-Mode.jpg",
  },
  {
    title: "The Body Supports the Mind",
    author: "Kim Allen",
    source: "audio dharma",
    uri: "https://www.audiodharma.org/talks/15271/download",
    imageSource:
      "https://9to5mac.com/?attachment_id=674265",
  },
  {
    title: "Impermanence",
    author: "Kim Allen",
    source: "audio dharma",
    uri: "https://www.audiodharma.org/talks/15270/download",
    imageSource:
      "https://media.idownloadblog.com/wp-content/uploads/2020/10/iOS-14.2-wallpaper-LAke-The-Cliff-Light-Mode.jpg",
  },
  {
    title: "Investigation of Wandering Talk",
    author: "Kim Allen",
    source: "audio dharma",
    uri: "https://www.audiodharma.org/talks/15265/download",
    imageSource:
      "https://9to5mac.com/wp-content/uploads/sites/6/2020/10/1811.Lake_The_Desert_Day-375w-812h@3xiphone.png",
  },
  {
    title: "Calm Recognition",
    author: "Gil Fronsdal",
    source: "audio dharma",
    uri: "https://www.audiodharma.org/talks/15247/download",
    imageSource:
      "https://9to5mac.com/wp-content/uploads/sites/6/2020/10/1822.Lake_The_Beach_Night-375w-812h@3xiphone.png",
  },{
    title: "Intro into Mindfulness",
    author: "Gil Fronsdal",
    source: "audio dharma",
    uri: "https://www.audiodharma.org/talks/14355/download",
    imageSource:
    "https://wallpx.com/image/2021/06/bird-windmill-boat-moon-flat-landscape.jpg",
  },
  {
    title: "Clear Recognition of Breathing",
    author: "Gil Fronsdal",
    source: "audio dharma",
    uri: "https://www.audiodharma.org/talks/14359/download",
    imageSource:
      "https://wallpaper.dog/large/5556683.jpg",
  },
  {
    title: "Respect for Breathing",
    author: "Gil Fronsdal",
    source: "audio dharma",
    uri: "https://www.audiodharma.org/talks/14363/download",
    imageSource:
      "https://cdn.wallpapersafari.com/58/70/jLB7Zb.png",
  },
  {
    title: "Restoring Wholeness",
    author: "Gil Fronsdal",
    source: "audio dharma",
    uri: "https://www.audiodharma.org/talks/14372/download",
    imageSource:
      "https://cdn.wallpapersafari.com/99/72/b1m2yM.jpg",
  },
  {
    title: "Release is Peace",
    author: "Gil Fronsdal",
    source: "audio dharma",
    uri: "https://www.audiodharma.org/talks/14380/download",
    imageSource:
      "https://wallpaperforu.com/wp-content/uploads/2020/05/vector_wallpaper_190520232191350x2400.jpg",
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

  useEffect(() => {
    return playbackInstance
      ? () => {
          console.log('Unloading Sound');
          playbackInstance.unloadAsync(); 
        }
      : undefined;
  }, [playbackInstance]);

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
          {/* <SeekBar
            durationMillis={durationMillis}
            positionMillis={positionMillis}
            sliderValue={sliderValue}
          /> */}
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
