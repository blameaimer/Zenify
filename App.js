import * as React from "react";
import { useState, useContext } from "react";
import { Image, TouchableOpacity } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import Home from "./Screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import Meditation from "./Screens/Meditation";
import Header from "./components/Header";
import SignOutScreen from "./Screens/SignOutScreen";
import LoginScreen from "./Screens/LoginScreen";
import TrackPlayer from "./components/TrackPlayer";
import { Ionicons } from "@expo/vector-icons";
import { trackContext } from "./utils/contexts";
import { LogBox } from "react-native";
import SignUpScreen from "./Screens/SignUpScreen";
import SplashScreen from "./Screens/SplashScreen";


LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

export default function App() {
  const [currentNum, setCurrentIndex] = useState(null);
  return (
    <trackContext.Provider value={{ currentNum, setCurrentIndex }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: true, headerShadowVisible: false }}
        >
           <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerTitle: "",
              headerTransparent: true,
              headerLeft: ()=> null
              
            }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={({ navigation }) => ({
              title: "Zenify",
              headerStyle: {
                backgroundColor: "#121212",
                shadowOpacity: 0,
              },
              headerLeft: () => null,
              headerTitle: () => null,
              headerTintColor: "dodgerblue",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            })}
          />
          <Stack.Screen
            name="SignOutScreen"
            component={SignOutScreen}
            options={({ navigation }) => ({
              title: "Zenify",
              headerStyle: {
                backgroundColor: "black",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerTitle: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={require("./assets/PngItem_4047206.png")}
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
                  onPress={() => navigation.navigate("SignOutScreen")}
                >
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={require("./assets/PngItem_4047206.png")}
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
                  <Ionicons
                    name="ios-chevron-back"
                    onPress={onPress}
                    size={40}
                    color="#444"
                  />
                ),
            }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{
              headerTitle: "",
              headerTransparent: true,
              headerLeft: ({ canGoBack, onPress }) =>
                canGoBack && (
                  <Ionicons
                    name="ios-chevron-back"
                    onPress={onPress}
                    size={40}
                    color="#444"
                  />
                ),
            }}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </trackContext.Provider>
  );
}
