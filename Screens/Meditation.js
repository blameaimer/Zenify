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
                            setCurrentIndex(item.key-1),
                              navigation.navigate("TrackPlayer")
                              
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
          // <View>
          //   {/* <TouchableOpacity
          //     onPress={() => navigation.navigate("TrackPlayer")}
          //   >
          //     <Text>body1</Text>
          //   </TouchableOpacity> */}
          // </View>
          <View>
            <Text>body2</Text>
          </View>
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
        text: "Item text 3",
        uri: "https://picsum.photos/id/1002/200",
      },
      {
        key: "4",
        text: "Item text 4",
        uri: "https://picsum.photos/id/1006/200",
      },
      {
        key: "5",
        text: "Item text 5",
        uri: "https://picsum.photos/id/1008/200",
      },
    ],
  },
  {
    title: "Meditate",
    horizontal: true,
    data: [
      {
        key: "6",
        text: "Item text 1",
        uri: "https://media.idownloadblog.com/wp-content/uploads/2020/10/iOS-14.2-wallpaper-LAke-The-Beach-Light-Mode.jpg",
      },
      {
        key: "7",
        text: "Item text 2",
        uri: "https://9to5mac.com/?attachment_id=674265",
      },

      {
        key: "8",
        text: "Item text 3",
        uri: "https://media.idownloadblog.com/wp-content/uploads/2020/10/iOS-14.2-wallpaper-LAke-The-Cliff-Light-Mode.jpg",
      },
      {
        key: "9",
        text: "Item text 4",
        uri: "https://9to5mac.com/wp-content/uploads/sites/6/2020/10/1811.Lake_The_Desert_Day-375w-812h@3xiphone.png",
      },
      {
        key: "5",
        text: "Item text 5",
        uri: "https://picsum.photos/id/1016/200",
      },
    ],
  },
  {
    title: "Based on your recent listening",
    horizontal: true,
    data: [
      {
        key: "1",
        text: "Item text 1",
        uri: "https://picsum.photos/id/1020/200",
      },
      {
        key: "2",
        text: "Item text 2",
        uri: "https://picsum.photos/id/1024/200",
      },

      {
        key: "3",
        text: "Item text 3",
        uri: "https://picsum.photos/id/1027/200",
      },
      {
        key: "4",
        text: "Item text 4",
        uri: "https://picsum.photos/id/1035/200",
      },
      {
        key: "5",
        text: "Item text 5",
        uri: "https://picsum.photos/id/1038/200",
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
