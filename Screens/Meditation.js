import React, { useState, useContext } from "react";
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
import SwitchSelector from "react-native-switch-selector";
import Unguided from "../components/Unguided";
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
function Meditation({ navigation }) {
  const { currentNum, setCurrentIndex } = useContext(trackContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.switch}>
        <SwitchSelector
          initial={0}
          onPress={toggleSwitch}
          textColor={"#015489"} //'#7a44cf'
          selectedColor={"white"}
          buttonColor={"#015489"}
          borderColor={"#015489"}
          bold={true}
          hasPadding
          // buttonMargin={10}
          options={[
            { label: "Guided", value: 0 },
            { label: "Unguided", value: 1 },
          ]}
        />
      </View>
      <View style={styles.content}>
        {!isEnabled ? (
          <SafeAreaView style={{ flex: 1 }}>
            <SectionList
              contentContainerStyle={{ paddingHorizontal: 10 }}
              stickySectionHeadersEnabled={false}
              sections={SECTIONS}
              renderSectionHeader={({ section }) => (
                <>
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                  {section.horizontal ? (
                    <FlatList
                      horizontal
                      data={section.data}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            setCurrentIndex(item.key - 1),
                              navigation.navigate("TrackPlayer");
                          }}
                        >
                          <ListItem item={item} />
                          {console.log(currentNum)}
                        </TouchableOpacity>
                      )}
                      showsHorizontalScrollIndicator={false}
                    />
                  ) : null}
                </>
              )}
              renderItem={({ item, section }) => {
                if (section.horizontal) {
                  return null;
                }
                return <ListItem item={item} />;
              }}
            />
          </SafeAreaView>
        ) : (
 <Unguided />
        )}
      </View>
    </View>
  );
}

const SECTIONS = [
  {
    title: "Made for you",
    horizontal: true,
    data: [
      {
        key: "1",
        text: "Breath",
        uri: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/4d412b54827733.596dc61650536.gif",
      },
      {
        key: "2",
        text: "Body Scan",
        uri: "https://wallpaperaccess.com/full/1725723.jpg",
      },

      {
        key: "3",
        text: "Wonderful Happiness",
        uri: "https://wallpaperboat.com/wp-content/uploads/2019/08/Firewatch-Wallpaper-For-Your-Iphone-1280-1024.jpg",
      },
      {
        key: "4",
        text: "Thinking",
        uri: "https://wallpapercave.com/wp/wp6827255.jpg",
      },
      {
        key: "5",
        text: "Receptive Mindfulness",
        uri: "https://c4.wallpaperflare.com/wallpaper/772/265/137/2d-flat-nature-mountain-top-hd-wallpaper-preview.jpg",
      },
    ],
  },
  {
    title: "Meditate",
    horizontal: true,
    data: [
      {
        key: "6",
        text: "Balanced Mindfulness",
        uri: "https://media.idownloadblog.com/wp-content/uploads/2020/10/iOS-14.2-wallpaper-LAke-The-Beach-Light-Mode.jpg",
      },
      {
        key: "7",
        text: "Body Supports Mind",
        uri: "https://9to5mac.com/?attachment_id=674265",
      },

      {
        key: "8",
        text: "Impermanence",
        uri: "https://media.idownloadblog.com/wp-content/uploads/2020/10/iOS-14.2-wallpaper-LAke-The-Cliff-Light-Mode.jpg",
      },
      {
        key: "9",
        text: "Wandering Talk",
        uri: "https://9to5mac.com/wp-content/uploads/sites/6/2020/10/1811.Lake_The_Desert_Day-375w-812h@3xiphone.png",
      },
      {
        key: "10",
        text: "Calm Recognition",
        uri: "https://9to5mac.com/wp-content/uploads/sites/6/2020/10/1822.Lake_The_Beach_Night-375w-812h@3xiphone.png",
      },
    ],
  },
  {
    title: "Guided Breathing",
    horizontal: true,
    data: [
      {
        key: "11",
        text: "Intro",
        uri: "https://wallpx.com/image/2021/06/bird-windmill-boat-moon-flat-landscape.jpg",
      },
      {
        key: "12",
        text: "Clear Recognition",
        uri: "https://wallpaper.dog/large/5556683.jpg",
      },

      {
        key: "13",
        text: "Respect",
        uri: "https://cdn.wallpapersafari.com/58/70/jLB7Zb.png",
      },
      {
        key: "14",
        text: "Restoring Wholeness",
        uri: "https://cdn.wallpapersafari.com/99/72/b1m2yM.jpg",
      },
      {
        key: "15",
        text: "Release is Peace",
        uri: "https://wallpaperforu.com/wp-content/uploads/2020/05/vector_wallpaper_190520232191350x2400.jpg",
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
  },
  itemPhoto: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  itemText: {
    color: "white",
    marginTop: 5,
  },
});
export default Meditation;
