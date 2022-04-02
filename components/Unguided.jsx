
import React, { useState,useEffect,useRef } from "react";
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
import { Audio } from "expo-av";

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
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying]=useState(false);
    const soundRef = useRef()

    async function playSound() {
      console.log('Loading Sound');
      
      const { sound } = await Audio.Sound.createAsync(
       { uri: `https://moodly.site/sounds/${soundRef.current}.mp3`}
      );
      setSound(sound);
      sound.setIsLoopingAsync(true);
      console.log('Playing Sound');
      if(!isPlaying){
      await sound.playAsync()}else {
        await sound.stopAsync()
       
      }
      setIsPlaying((currentPlay) => !currentPlay);
    }
  
    useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync(); 
          }
        : undefined;
    }, [sound]);



   
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{    flexGrow: 1,
    padding: 15,
    // height: "20%",
    marginTop: 5,
    justifyContent: "space-between",
    flexDirection: "row",}}> 
          <Text style={{  fontSize: 30,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 20,
    fontWeight: "700",
    color: "white"}}> Sounds</Text>
    <View style={{height: 40}}>
    {isPlaying? <Image
          style={{
            width: 80,
            height: 80,
            alignSelf: "center",
            marginBottom: 140,
            alignSelf:"flex-end",
            position:"relative"
          }}
          source={require("../assets/554818561cbf36d813ef2010cc9d66cc.gif")}
        /> : undefined }
        </View>
        
        </View>
          
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
              soundRef.current = item.text.toLowerCase()
              playSound();
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

