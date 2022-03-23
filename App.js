import * as React from "react";
import { Image,TouchableOpacity} from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import Home from "./Screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import Meditation from "./Screens/Meditation";
import Header from "./components/Header";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
   
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={({navigation}) => ({ 
          title: 'Zenify',
          headerStyle: {
            backgroundColor: 'black',
          },headerLeft: ()=> null,
          headerTitle: () => (
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Image style={{ width: 30, height: 30 }} source={require("./components/PngItem_4047206.png")} />
              </TouchableOpacity>
            ),
          headerTintColor: 'dodgerblue',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}/>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={({navigation}) => ({ 
          title: 'Zenify',
          headerStyle: {
            backgroundColor: 'black',
          }, 
          headerTitle: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={{ width: 30, height: 30 }} source={require("./components/PngItem_4047206.png")} />
              </TouchableOpacity>
            ),
          headerTintColor: 'dodgerblue',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}/>
        <Stack.Screen name="Home" component={Home} options={({navigation}) => ({ 
          title: 'Zenify',
          headerStyle: {
            backgroundColor: 'black',
          }, headerLeft: ()=> null,
          // `headerLeft: undefined` should work too
          // `headerLeft: null` should work but could trigger a TS error

          headerTitle: () => (
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Image style={{ width: 30, height: 30 }} source={require("./components/PngItem_4047206.png")} />
              </TouchableOpacity>
            ),
            
          headerTintColor: 'dodgerblue',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
        />
  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
