import * as React from "react";
import { useState,useContext} from "react";
import { Image, TouchableOpacity } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import Home from "./Screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import Meditation from "./Screens/Meditation";
import Header from "./components/Header";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import TrackPlayer from "./components/TrackPlayer";
import { Ionicons } from "@expo/vector-icons";
import { trackContext } from "./utils/contexts";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!","AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"
]);
const Stack = createStackNavigator();

export default function App() {
  const [currentNum, setCurrentIndex]=useState(null)
  return (
    <trackContext.Provider value={{currentNum,setCurrentIndex}}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true, headerShadowVisible: false}}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={({ navigation }) => ({
            title: "Zenify",
            headerStyle: {
              backgroundColor: "black",
              shadowOpacity: 0,
            },
            headerLeft: () => null,
            headerTitle: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("./components/PngItem_4047206.png")}
                />
              </TouchableOpacity>
            ),
            headerTintColor: "dodgerblue",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          })}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Zenify",
            headerStyle: {
              backgroundColor: "black",
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0 
            },
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("./components/PngItem_4047206.png")}
                />
              </TouchableOpacity>
            ),
            headerTintColor: "dodgerblue",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          })}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: "Zenify",
            headerStyle: {
              backgroundColor: "black",
            },
            headerLeft: () => null,
            // `headerLeft: undefined` should work too
            // `headerLeft: null` should work but could trigger a TS error

            headerTitle: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}
              >
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("./components/PngItem_4047206.png")}
                />
              </TouchableOpacity>
            ),

            headerTintColor: "dodgerblue",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          })}
        />
        <Stack.Screen
          name="TrackPlayer"
          component={TrackPlayer}
          options={{
            headerTitle: "",
            headerTransparent: true,
            headerLeft: ({ canGoBack, onPress }) =>
            canGoBack && (
              <Ionicons name="ios-chevron-back" onPress={onPress} size={40} color="#444" />

             
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </trackContext.Provider>
  );
}
